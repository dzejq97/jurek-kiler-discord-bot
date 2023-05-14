const { Sequelize } = require('sequelize');
const sqlite = require('sqlite3');

const sequelize = new Sequelize('database', 'user', 'password', {
	dialect: 'sqlite',
	storage: './global.db',
	dialectOptions: {
		mode: sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE | sqlite.OPEN_FULLMUTEX,
	},
	logging: false,
});
module.exports = sequelize;
