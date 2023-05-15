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
		const cmd = args.shift().toLowerCase();
		console.log(cmd);
		console.log(args);
		//  Here to contine, find command and execute it by name

		message.reply('message');
	}
};