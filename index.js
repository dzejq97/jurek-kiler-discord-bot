const { token } = require('./config.json');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

const JKClient = require('./core/JKClient');
const client = new JKClient();

const init = async () => {
	await client.sequelize.sync({ force: true });
	//await client.sequelize.sync();

	const eventsDirectory = await readdir('./events/');
	eventsDirectory.forEach((eventFile) => {
		const eventName = eventFile.split('.')[0];
		const event = new (require(`./events/${eventName}.js`))(client);
		if (event.once === true) {
			client.once(eventName, (...args) => event.execute(...args));
		} else {
			client.on(eventName, (...args) => event.execute(...args));
		}
		client.Logger.logInfo(`Loaded event: '${eventName}'`);
	});
	client.Logger.logSuccess(`Loaded total of ${eventsDirectory.length} events`);

	const commandsCategories = await readdir('./commands/');
	commandsCategories.forEach(async (category) => {
		const commands = await readdir(`./commands/${category}/`);
		commands.forEach((commandFile) => {
			const commandName = commandFile.split('.')[0];
			client.loadCommand(category, commandName);
		});
		client.Logger.logSuccess(`Loaded total of ${commands.length} commands from ${category}`);
	});

	client.login(token);
};
init();