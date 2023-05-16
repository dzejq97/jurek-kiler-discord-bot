const { Client, IntentsBitField, Collection, REST, Routes} = require('discord.js');

class JKClient extends Client {
	constructor() {
		super({
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMembers,
				IntentsBitField.Flags.GuildMessages,
				IntentsBitField.Flags.MessageContent,
				IntentsBitField.Flags.GuildMessageReactions,
				IntentsBitField.Flags.GuildVoiceStates,
				IntentsBitField.Flags.DirectMessages,
			],
		});

		this.Commands = new Collection();
		this.CommandsAliases = new Collection();
		this.Config = require('../config.json');
		this.sequelize = require('./sequelize');
		this.Guild = require('./database_models/Guild');
	}

	strHasPrefix(str) {
		for (const i of this.Config.prefixes) {
			if (str.startsWith(i)) return { hasPrefix: true, prefix: i };
		}
		return { hasPrefix: false, prefix: null};
	}

	async loadCommand(category, commandName) {
		try {
			const command = new (require(`../commands/${category}/${commandName}.js`))(this);
			console.log(command);

			this.Commands.set(command.info.name, command);
			command.info.aliases.forEach(alias => {
				this.CommandsAliases.set(alias, command.info.name);
			});
			console.log(`Loaded command: ${command.info.name} from category ${category} containing ${command.info.aliases.length} aliases - ${command.info.aliases}`);
		} catch (error) {
			console.log(error);
		}
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