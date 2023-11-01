const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

class User extends Model {
	checkPassword(loginPw) {
		return bcrypt.compareSync(loginPw, this.password);
	}
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { isAlpha: true },
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8],
			},
		},
	},
	{
		hooks: {
			beforeCreate: async (newUserData) => {
				newUserData.password = await bcrypt.hash(
					newUserData.password,
					10,
				);
				return newUserData;
			},
		},
		sequelize,
		timestamps: false,
		modelName: 'User',
	},
);

module.exports = User;
