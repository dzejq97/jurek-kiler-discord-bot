const Command = require('../../core/Command.js');

class Ping extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			aliases: [ 'pong', 'png' ],
			ownerOnly: true,
		});
	}

	async execute(meta, ...args) {
		meta.message.reply('Pong!');
	}
}

module.exports = Ping;