const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model {}

Post.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
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
	},
	{
		sequelize,
		timestamps: false,
		modelName: 'Post',
	},
);

module.exports = Post;
