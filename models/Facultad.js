// models/Departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Facultad = sequelize.define('Facultad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    
  }
});

module.exports = Facultad;
