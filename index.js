const { Events } = require('discord.js');
const { token } = require('./config.json');

const JKClient = require('./JKClient'),
	client = new JKClient();

client.once(Events.ClientReady, c => {
	console.log(`Logged in as ${c.user.tag}`);
});

client.login(token);