module.exports = class {
	constructor(client) {
		this.client = client;
		this.once = false;
	}

	async execute(message) {
		// Ignore bots messages
		if (message.author.bot) return;

		const result = this.client.strHasPrefix(message.content);
		if (!result.hasPrefix) return;

		const args = message.content.slice(result.prefix.length).split(' ').filter((s) => s != '');
		const commandName = args.shift().toLowerCase();
		const cmd = this.client.Commands.get(commandName) || this.client.Commands.get(this.client.CommandsAliases.get(commandName))

		console.log(cmd);
		if (!cmd) return message.reply('Nie ma takiej komendy');

		const meta = {
			command: cmd,
			prefix: result.prefix,
			message: message,
		};
		cmd.execute(meta, args);
	}
};