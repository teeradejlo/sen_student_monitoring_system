'use strict';

module.exports = (sequelize, DataTypes) => {
	const teachers = sequelize.define(
		'teachers',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
			},
		},
		{
			tableName: 'teachers',
			timestamps: false,
		},
	);

	teachers.associate = function (models) {
		teachers.belongsToMany(models.students, { through: { model: models.sessions, unique: false } });
	};

	return teachers;
};