const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Guild extends Model {}
Guild.init({
	ID: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	GuildID: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {
	sequelize,
	name: 'Guild',
});

module.exports = Guild;