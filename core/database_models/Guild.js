const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Guild extends Model {}
Guild.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
	},
}, {
	sequelize,
	name: 'Guild',
});

module.exports = Guild;