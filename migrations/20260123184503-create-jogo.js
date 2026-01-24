// Arquivo: migrations/XXXXXXXXXXXXXX-create-jogo.js
'use strict';
module.exports = {
 async up(queryInterface, Sequelize) {
 await queryInterface.createTable('Jogo', {
 id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
 titulo: { allowNull: false, type: Sequelize.STRING },
 plataforma: { allowNull: false, type: Sequelize.STRING },
 amigoId: {
 allowNull: false,
 type: Sequelize.INTEGER,
 references: { model: 'Amigo', key: 'id' },
 onUpdate: 'CASCADE',
 onDelete: 'RESTRICT'
 },
 createdAt: { allowNull: false, type: Sequelize.DATE },
 updatedAt: { allowNull: false, type: Sequelize.DATE }
 });
 },
 async down(queryInterface, Sequelize) {
 await queryInterface.dropTable('Jogo');
 }
};