class Command {
	constructor(client, {
		name = null,
		enabled = true,
		aliases = new Array(),
		ownerOnly = false,
		cooldown = 3000,
	}) {
		this.client = client;
		this.info = { name, enabled, aliases, ownerOnly, cooldown };
	}
}

module.exports = Command;