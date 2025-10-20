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
    
  },
  pais: {
    type: DataTypes.STRING,
    
  },

});

module.exports = Nacionalidad;
