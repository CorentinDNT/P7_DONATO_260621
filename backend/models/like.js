"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Like.belongsTo(models.User);
			models.Like.belongsTo(models.Post);
		}
	}
	Like.init(
		{
			rate: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Like",
		}
	);
	return Like;
};
/*
	Rate.associate = (models) => {
		Rate.belongsTo(models.User);
		Rate.belongsTo(models.Post);
	};
*/
