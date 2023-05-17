module.exports = class {
	constructor(client) {
		this.client = client;
		this.once = true;
	}

	async execute(guild) {
		await this.client.getOrCreateGuild(guild.id);
	}
};