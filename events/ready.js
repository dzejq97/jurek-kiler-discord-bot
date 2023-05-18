module.exports = class {
	constructor(client) {
		this.client = client;
		this.once = true;
	}

	async execute() {
		await this.client.syncDatabase();
		await this.client.initUpdateLoop();
		this.client.Logger.logSuccess(`Logged in as ${this.client.user.tag}`);
	}
};