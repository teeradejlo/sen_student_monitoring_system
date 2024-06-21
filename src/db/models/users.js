'use strict';

module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define(
		'users',
		{
			username: {
				type: DataTypes.STRING,
				primaryKey: true
			},
			password: {
				type: DataTypes.STRING,
			}
		},
		{
			tableName: 'users',
			timestamps: false,
		},
	);

	return users;
};