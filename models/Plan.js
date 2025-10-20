// models/Departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Plan = sequelize.define('Plan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    
  },
  nivel_academico: {
    type: DataTypes.STRING,
    
  },
  vigencia: {
    type: DataTypes.DATEONLY,
    
  },

});

module.exports = Plan;
