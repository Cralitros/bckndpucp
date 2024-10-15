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
    allowNull: false
  },
  gestor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false
  },
  inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fin: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

module.exports = Programas;
