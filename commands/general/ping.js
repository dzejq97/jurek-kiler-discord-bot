const Command = require('../../core/Command.js');

class Ping extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			aliases: [ 'pong', 'png' ],
			ownerOnly: true,
		});
	}

	async execute(message) {
		message.reply('Pong!');
	}
}

module.exports = Ping;