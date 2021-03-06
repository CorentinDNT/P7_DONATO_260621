"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.User.hasMany(models.Post, {
				foreignKey: {
					allowNull: true,
				},
			});
			models.User.hasMany(models.Comment, {
				foreignKey: {
					allowNull: true,
				},
			});
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				required: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				required: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
