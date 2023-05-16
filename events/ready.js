
module.exports = class {
	constructor(client) {
		this.client = client;
		this.once = true;
	}

	async execute() {
		await this.client.syncDatabase();
		console.log(`Logged in as ${this.client.user.tag}`);
	}
};