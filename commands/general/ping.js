const Command = require('../../core/Command.js');

class Ping extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			aliases: [ 'pong', 'png' ],
			ownerOnly: true,
		});
	}

	async execute(meta, args) {
		meta.message.reply(this.info.category);
		meta.message.reply('Pong!');

		if (args) meta.message.reply(args.join(' '));
	}
}

module.exports = Ping;