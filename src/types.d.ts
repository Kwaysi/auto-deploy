import { Model, ModelCtor, Optional } from 'sequelize/types';

interface DefaultAttributes {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

export interface Repo extends DefaultAttributes {
	name: string;
	path: string;
	version: string;
	deployCommands: string;
	lastDeploy: string | null;
}

export interface RepoCreationAttributes
	extends Optional<Repo, keyof DefaultAttributes> {}

export interface RepoInstance
	extends Model<Repo, RepoCreationAttributes>,
		Repo {}

export interface Deploy extends DefaultAttributes {
	log: string;
	repoId: string;
	status: string;
	version: string;
}

export interface DeployCreationAttributes
	extends Optional<Deploy, keyof DefaultAttributes> {}

export interface DeployInstance
	extends Model<Deploy, DeployCreationAttributes>,
		Deploy {}

type Models = {
	[key: string]: ModelCtor<any>;
};

type CreateErr = (
	message: string,
	code?: number,
	validations?: object
) => Error;

type AppError = Error & {
	code: number;
	name?: string;
	message: string;
	validations?: object | null;
};

type Fix = any;
