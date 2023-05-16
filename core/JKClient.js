const { Client, IntentsBitField, Collection} = require('discord.js');

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
		return { hasPrefix: false, prefix: null };
	}

	async syncDatabase() {
		const _guilds = await this.guilds.fetch();

		for (const guild of _guilds.values()) {
			// Synchronize guiilds data
			const guildResult = await this.GuildModel.findOne({ where: { GuildID: guild.id } });
			if (!guildResult) this.GuildModel.create({ GuildID: guild.id });


			// Synchronize members data - add members that are in guild, and are not in database. In example when user joins guild when bot is off
			const thisGuild = await guild.fetch();
			const _members = await thisGuild.members.fetch();
			for (const member of _members.values()) {
				const memberResult = await this.MemberModel.findOne({ where: { UserID: member.user.id, GuildID: guild.id } });
				if (!memberResult && !member.bot) this.MemberModel.create({ UserID: member.user.id, GuildID: guild.id });
			}
		}
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