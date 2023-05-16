
module.exports = class {
	constructor(client) {
		this.client = client;
		this.once = true;
	}

	async execute() {
		console.log(`Logged in as ${this.client.user.tag}`);

		this.client.syncDatabase();
	}
};