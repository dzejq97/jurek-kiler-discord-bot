const { Client, IntentsBitField} = require('discord.js');

class JKBot extends Client {

	constructor() {
		super({
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMembers,
				IntentsBitField.Flags.GuildMessages,
			],
		});

		this.Database;
	}

}

module.exports = JKBot;