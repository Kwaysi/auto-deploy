import { Model, Sequelize, DataTypes } from 'sequelize';
import { Models, Job, JobCreationAttributes } from '../../../types';

interface JobInstance extends Model<Job, JobCreationAttributes>, Job {}

export default function jobModel(sequelize: Sequelize) {
  const job = sequelize.define<JobInstance>(
    'jobs',
    {
      id: {
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: {
            args: 4,
            msg: 'id must be uuid',
          },
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      repeat: {
        allowNull: false,
        type: DataTypes.JSON,
      },
      lastRun: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      nextRun: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      isActive: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
      },
      lastSuccessful: {
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      paranoid: true,
    },
  );

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // @ts-ignore
  job.associate = (_models: Models) => {
    // associations can be defined here
    // e.g models.user.hasMany(models.accounts);
  };

  return job;
}
