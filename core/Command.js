class Command {
	constructor(client, {
		name = null,
		category = null,
		enabled = true,
		aliases = new Array(),
		ownerOnly = false,
		cooldown = 3000,
	}) {
		this.client = client;
		this.info = { name, enabled, category, aliases, ownerOnly, cooldown };
	}
}

module.exports = Command;