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
    allowNull: false
  },
  nivel_academico: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vigencia: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

});

module.exports = Plan;
