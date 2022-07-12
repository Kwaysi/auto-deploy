import { Model, Sequelize, DataTypes } from 'sequelize';
import { Models, Repo, RepoCreationAttributes } from '../../types';

interface RepoInstance extends Model<Repo, RepoCreationAttributes>, Repo {}

export default function repoModel(sequelize: Sequelize) {
	const repos = sequelize.define<RepoInstance>(
		'repos',
		{
			id: {
				unique: true,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				validate: {
					isUUID: {
						args: 4,
						msg: 'id must be uuid'
					}
				}
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING
			},
			path: {
				allowNull: false,
				type: DataTypes.STRING
			},
			version: {
				allowNull: false,
				type: DataTypes.STRING
			},
			deployCommands: {
				allowNull: false,
				type: DataTypes.STRING
			},
			lastDeploy: {
				allowNull: false,
				type: DataTypes.DATE
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			deletedAt: {
				type: DataTypes.DATE
			}
		},
		{
			paranoid: true
		}
	);

	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// @ts-ignore
	repos.associate = (_models: Models) => {
		// associations can be defined here
		// e.g models.user.hasMany(models.accounts);
	};

	return repos;
}
