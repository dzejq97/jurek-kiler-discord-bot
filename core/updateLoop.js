module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async execute() {
		console.log('update loop');
	}
}