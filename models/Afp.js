// models/Departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Afp = sequelize.define('Afp', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },

}, {
  tableName: 'afps', // ← coincide con el nombre real en la BD
});

module.exports = Afp;
