// models/Departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Departamento = sequelize.define('Departamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    
  },
  valor:{
    type: DataTypes.STRING,
    
  }
});

module.exports = Departamento;
