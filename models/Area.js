// models/Departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Area = sequelize.define('Area', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
     allowNull: true

  },

}, {
  tableName: 'areas', // ← coincide con el nombre real en la BD
});

module.exports = Area;
