import { Sequelize } from 'sequelize';

import repoModel from './repos';
import deploysModel from './deploys';
import dbconfig from '../config/config';

const { NODE_ENV = 'development' } = process.env;

const config = dbconfig[NODE_ENV];

let sequelize: Sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

const db = {
	sequelize,
	Sequelize,
	// Add models here e.g cards: cards(sequelize)
	// Doing this manually to enable auto complete when destructuring
	repos: repoModel(sequelize),
	deploys: deploysModel(sequelize),
};

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

export default db;
