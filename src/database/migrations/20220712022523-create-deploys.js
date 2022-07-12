'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'deploys',
			{
				id: {
					unique: true,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4
				},
				log: {
					type: Sequelize.STRING
				},
				status: {
					type: Sequelize.STRING
				},
				version: {
					type: Sequelize.STRING
				},
				repoId: {
					type: Sequelize.UUID
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
		await queryInterface.dropTable('deploys');
	}
};
