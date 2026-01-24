// Arquivo: seeders/XXXXXXXXXXXXXX-demo-amigos.js
'use strict';
module.exports = {
 async up(queryInterface, Sequelize) {
 return queryInterface.bulkInsert('Amigo', [
 { nome: 'Ana', email: 'ana@email.com', createdAt: new Date(), updatedAt: new Date() },
 { nome: 'Bruno', email: 'bruno@email.com', createdAt: new Date(), updatedAt: new
Date() }
 ]);
 },
 async down(queryInterface, Sequelize) {
 return queryInterface.bulkDelete('Amigo', null, {});
 }
};