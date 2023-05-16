const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Member extends Model {}
Member.init({
	ID: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	UserID: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	GuildID: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {
	sequelize,
	name: 'Member',
});

module.exports = Member;