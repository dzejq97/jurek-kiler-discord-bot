module.exports = class {
	constructor(client) {
		this.client = client;
		this.once = true;
	}

	async execute(member) {
		await this.client.getOrCreateMember(member.user.id, member.guild.id);
	}
};