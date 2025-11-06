// models/Departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Escuela = sequelize.define('Escuela', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
     allowNull: true
  }

}, {
  tableName: 'escuelas', // ← coincide con el nombre real en la BD
});

module.exports = Escuela;
