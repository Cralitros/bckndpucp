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
        
    },
    valor: {
        type: DataTypes.STRING,
        
    },
   
});

// Definir la asociación


module.exports = Provincia;
