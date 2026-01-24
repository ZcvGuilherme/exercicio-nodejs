// Arquivo: seeders/XXXXXXXXXXXXXX-demo-jogos.js
'use strict';
module.exports = {
 async up(queryInterface, Sequelize) {
 return queryInterface.bulkInsert('Jogo', [
 { titulo: 'Stardew Valley', plataforma: 'PC', amigoId: 1, createdAt: new Date(),
updatedAt: new Date() },
 { titulo: 'Mario Kart 8', plataforma: 'Switch', amigoId: 2, createdAt: new Date(),
updatedAt: new Date() }
 ]);
 },
 async down(queryInterface, Sequelize) {
 return queryInterface.bulkDelete('Jogo', null, {});
 }
};