const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Users',
				key: 'id',
			},
		},
		post_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Posts',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		modelName: 'Comment',
	},
);

module.exports = Comment;
