// models/Ciudad.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Provincia = sequelize.define('Provincia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
         allowNull: true
    },
    valor: {
        type: DataTypes.STRING,
         allowNull: true
    },
   
}, {
  tableName: 'provincia', // ← coincide con el nombre real en la BD
});

// Definir la asociación


module.exports = Provincia;
