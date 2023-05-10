const { Client, IntentsBitField} = require('discord.js');

class JKClient extends Client {
	constructor() {
		super({
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMembers,
				IntentsBitField.Flags.GuildMessages,
			],
		});

		this.sequelize = require('./sequelize');
		this.Guild = require('./database_models/Guild');
	}

	async getOrCreateGuild(guildID) {
		let _guild = await this.Guild.findOne({ where: { id: guildID } });
		if (_guild === null) {
			_guild = await this.Guild.create({ id: guildID });
			return _guild;
		} else {
			return _guild;
		}
	}
}

module.exports = JKClient;