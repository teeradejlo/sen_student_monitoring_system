'use strict';

module.exports = (sequelize, DataTypes) => {
	const students = sequelize.define(
		'students',
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
			tableName: 'students',
			timestamps: false,
		},
	);

	students.associate = function (models) {
		students.belongsToMany(models.teachers, { through: { model: models.sessions, unique: false } });
	};

	return students;
};