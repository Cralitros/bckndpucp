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
     allowNull: true
    
  },
  valor:{
    type: DataTypes.STRING,
     allowNull: true
    
  }
}, {
  tableName: 'departamentos', // ← coincide con el nombre real en la BD
});

module.exports = Departamento;
