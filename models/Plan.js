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
     allowNull: true
  },
  nivel_academico: {
    type: DataTypes.STRING,
     allowNull: true
  },
  vigencia: {
    type: DataTypes.DATEONLY,
     allowNull: true
  },

}, {
  tableName: 'plans', // ← coincide con el nombre real en la BD
});

module.exports = Plan;
