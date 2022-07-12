'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'repos',
			{
				id: {
					unique: true,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					validate: {
						isUUID: {
							args: 4,
							msg: 'id must be uuid'
						}
					}
				},
				name: {
					allowNull: false,
					type: Sequelize.STRING
				},
				path: {
					allowNull: false,
					type: Sequelize.STRING
				},
				version: {
					allowNull: false,
					type: Sequelize.STRING
				},
				lastDeploy: {
					allowNull: false,
					type: Sequelize.DATE
				},
				deployCommands: {
					allowNull: false,
					type: Sequelize.STRING
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE
				},
				deletedAt: {
					allowNull: true,
					type: Sequelize.DATE
				}
			},
			{
				paranoid: true
			}
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('repos');
	}
};
