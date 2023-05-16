
module.exports = class {
	constructor(client) {
		this.client = client;
		this.once = true;
	}

	async execute() {
		console.log(`Logged in as ${this.client.user.tag}`);
		// Verify and register members on startup
		const guilds = await this.client.guilds.fetch();
		let _guildsCount = 0;
		let _membersCount = 0;
	}
};