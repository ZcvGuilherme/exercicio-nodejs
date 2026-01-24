// Arquivo: migrations/XXXXXXXXXXXXXX-create-emprestimo.js
'use strict';
module.exports = {
 async up(queryInterface, Sequelize) {
 await queryInterface.createTable('Emprestimo', {
 id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
 jogoId: {
 allowNull: false,
 type: Sequelize.INTEGER,
 references: { model: 'Jogo', key: 'id' },
 onUpdate: 'CASCADE',
 onDelete: 'RESTRICT'
 },
 amigoId: {
 allowNull: false,
 type: Sequelize.INTEGER,
 references: { model: 'Amigo', key: 'id' },
 onUpdate: 'CASCADE',
 onDelete: 'RESTRICT'
 }, 
 dataInicio: { allowNull: false, type: Sequelize.STRING },
 dataFim: { allowNull: true, type: Sequelize.STRING },
 createdAt: { allowNull: false, type: Sequelize.DATE },
 updatedAt: { allowNull: false, type: Sequelize.DATE }
 });
 },
 async down(queryInterface, Sequelize) {
 await queryInterface.dropTable('Emprestimo');
 }
}