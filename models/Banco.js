// models/Departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Banco = sequelize.define('Banco', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

module.exports = Banco;
