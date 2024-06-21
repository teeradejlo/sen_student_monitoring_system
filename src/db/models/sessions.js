'use strict';

module.exports = (sequelize, DataTypes) => {
	const sessions = sequelize.define(
		'sessions',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			studentId: {
				type: DataTypes.INTEGER,
			},
			teacherId: {
				type: DataTypes.INTEGER,
			}
		},
		{
			tableName: 'sessions',
			timestamps: false,
		},
	);

	return sessions;
};