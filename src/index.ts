import './env';
import morgan from 'morgan';
import express from 'express';

import routes from './modules';
import db from './database/models';
import { errorHandler } from './modules/common/utils';

const {
	PORT = 1445,
	SERVICE_PATH = '',
	NODE_ENV = 'development'
} = process.env;

const morganConfig = NODE_ENV === 'development' ? 'dev' : 'tiny';

const app = express();
app.disable('x-powered-by');

app.use(
	`/${SERVICE_PATH}`,
	morgan(morganConfig),
	express.urlencoded({ extended: true, limit: '10mb' }),
	express.json({ limit: '10mb' }),
	routes,
	errorHandler
);

db.sequelize
	.authenticate()
	.then(() => {
		console.log(`Environment is ${NODE_ENV}`);
		console.log(`Connected to database: ${db.sequelize.getDatabaseName()}`);
		app.listen(PORT, () => {
			console.log(`Server started on port: ${PORT} \n\n`);
		});
	})
	.catch(e => console.log('Failed to connect to database:', e.message));
