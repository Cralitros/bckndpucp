// models/Departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Programas = sequelize.define('Programas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  programa: {
    type: DataTypes.STRING,
     allowNull: true
  },
  gestor: {
    type: DataTypes.STRING,
     allowNull: true
  },
  director: {
    type: DataTypes.STRING,
     allowNull: true
  },
  inicio: {
    type: DataTypes.DATEONLY,
     allowNull: true
  },
  fin: {
    type: DataTypes.DATEONLY,
     allowNull: true
  }
}, {
  tableName: 'programas', // ← coincide con el nombre real en la BD
});

module.exports = Programas;
