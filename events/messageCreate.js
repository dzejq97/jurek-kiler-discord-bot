module.exports = class {
	constructor(client) {
		this.client = client;
		this.once = false;
	}

	async execute(message) {
		// Ignore bots messages
		if (message.author.bot) return;

		// Check if user is using a command prefix
		const result = this.client.strHasPrefix(message.content);
		if (!result.hasPrefix) return;

		// Cut the message to separate arguments array, and find command name
		const args = message.content.slice(result.prefix.length).split(' ').filter((s) => s != '');
		const commandName = args.shift().toLowerCase();
		const cmd = this.client.Commands.get(commandName) || this.client.Commands.get(this.client.CommandsAliases.get(commandName));

		// Return if command doesn't exists
		if (!cmd) return;

		// Pass metadata from message to command
		const meta = {
			command: cmd,
			prefix: result.prefix,
			message: message,
		};
		// And execute command
		cmd.execute(meta, args);
	}
};