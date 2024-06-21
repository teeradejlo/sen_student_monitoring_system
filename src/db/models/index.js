'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const basename = "index.js";
const db = {};
const modelsPath = path.join(process.cwd(), '/src/db/models');

fs
	.readdirSync(modelsPath)
	.filter(file => {
		return (
			file !== "index.js" &&
			file !== basename &&
			file.indexOf('.') !== 0 &&
			file.slice(-3) === '.js' &&
			file.indexOf('.test.js') === -1
		);
	})
	.forEach(file => {
		const model = require(__dirname + '/../models/' + file)(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}

	db[modelName].sync();
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log("[DB]:", Object.keys(db));

module.exports = db;
