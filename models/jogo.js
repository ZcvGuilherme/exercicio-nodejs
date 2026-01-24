// Arquivo: models/jogo.js
'use strict';
module.exports = (sequelize, DataTypes) => {
 const Jogo = sequelize.define(
 'Jogo',
 {
 titulo: { type: DataTypes.STRING, allowNull: false },
 plataforma: { type: DataTypes.STRING, allowNull: false },
 amigoId: { type: DataTypes.INTEGER, allowNull: false }
 },
 { tableName: 'Jogo' }
 );
 Jogo.associate = function(models) {
 Jogo.belongsTo(models.Amigo, { foreignKey: 'amigoId', as: 'dono' });
 Jogo.hasMany(models.Emprestimo, { foreignKey: 'jogoId', as: 'emprestimos' });
 };
 return Jogo;
};