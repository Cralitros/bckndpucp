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
    
  },
  gestor: {
    type: DataTypes.STRING,
    
  },
  director: {
    type: DataTypes.STRING,
    
  },
  inicio: {
    type: DataTypes.DATEONLY,
    
  },
  fin: {
    type: DataTypes.DATEONLY,
    
  }
});

module.exports = Programas;
