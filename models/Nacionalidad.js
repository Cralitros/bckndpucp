// models/Departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Nacionalidad = sequelize.define('Nacionalidad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

module.exports = Nacionalidad;
