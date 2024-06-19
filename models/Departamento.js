// models/Departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Provincia = require('./Provincia');

const Departamento = sequelize.define('Departamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

Provincia.belongsTo(Departamento, { foreignKey: 'departamento_id' });
Departamento.hasMany(Provincia, { foreignKey: 'departamento_id' });

module.exports = Departamento;
