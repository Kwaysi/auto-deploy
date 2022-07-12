import { Sequelize, DataTypes } from 'sequelize';
import { Models, DeployInstance } from '../../types';

export default function deployModel(sequelize: Sequelize) {
	const deploys = sequelize.define<DeployInstance>(
		'deploys',
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
			log: {
				type: DataTypes.STRING
			},
			status: {
				type: DataTypes.STRING
			},
			version: {
				type: DataTypes.STRING
			},
			repoId: {
				allowNull: false,
				type: DataTypes.UUID,
				references: { model: 'repos', key: 'id' }
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
	deploys.associate = (models: Models) => {
		// associations can be defined here
		// e.g models.user.hasMany(models.accounts);
		models.deploys.belongsTo(models.repos);
	};

	return deploys;
}
