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
		this.GuildModel = require('./database_models/Guild.js');
		this.MemberModel = require('./database_models/Member.js');
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
		let _guild = await this.GuildModel.findOne({ where: { GuildID: guildID } });

		if (_guild === null) {
			_guild = await this.GuildModel.create({ GuildID: guildID });
			return _guild;
		} else {
			return _guild;
		}
	}

	async getOrCreateMember(userID, guildID) {
		let _member = await this.Guild.findOne({ where: { UserID: userID, GuildID: guildID } });

		if (!_member) {
			_member = await this.MemberModel.create({ UserID: userID, GuildID: guildID });
			return _member;
		} else {
			return _member;
		}
	}
}
module.exports = JKClient;