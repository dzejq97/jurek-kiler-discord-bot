const { token } = require('./config.json');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

const JKClient = require('./core/JKClient');
const client = new JKClient();

const init = async () => {
	await client.sequelize.sync();

	const eventsDirectory = await readdir('./events/');
	eventsDirectory.forEach((eventFile) => {
		const eventName = eventFile.split('.')[0];
		const event = new (require(`./events/${eventName}.js`))(client);
		if (event.once === true) {
			client.once(eventName, (...args) => event.execute(...args));
		} else {
			client.on(eventName, (...args) => event.execute(...args));
		}
		console.log(`Loaded event: '${eventName}'`);
	});
	console.log(`Loaded total of ${eventsDirectory.length} events`);


	const commandsCategories = await readdir('./commands/');
	commandsCategories.forEach(async (category) => {
		const commands = await readdir(`./commands/${category}/`);
		commands.forEach((commandFile) => {
			const commandName = commandFile.split('.')[0];
			client.loadCommand(category, commandName);

			const command = new (require(`./commands/${category}/${commandFile}`));
			client.Commands.set(commandName, command);
		});
		console.log(`Loaded total of ${commands.length} commands from ${category}`);
	});

	client.login(token);
};
init();