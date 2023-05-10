const { token } = require('./config.json');

const JKClient = require('./core/JKClient');
const client = new JKClient();

const init = async () => {
	await client.sequelize.sync();
	client.login(token);
};

init();