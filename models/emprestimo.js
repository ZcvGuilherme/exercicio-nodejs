// Arquivo: models/emprestimo.js
'use strict';
module.exports = (sequelize, DataTypes) => {
 const Emprestimo = sequelize.define(
 'Emprestimo',
 {
 jogoId: { type: DataTypes.INTEGER, allowNull: false },
 amigoId: { type: DataTypes.INTEGER, allowNull: false },
 dataInicio: { type: DataTypes.STRING, allowNull: false },
 dataFim: { type: DataTypes.STRING, allowNull: true }
 },
 { tableName: 'Emprestimo' }
 );
 Emprestimo.associate = function(models) {
 Emprestimo.belongsTo(models.Jogo, { foreignKey: 'jogoId', as: 'jogo' });
 Emprestimo.belongsTo(models.Amigo, { foreignKey: 'amigoId', as: 'amigo' });
 };
 return Emprestimo;
};