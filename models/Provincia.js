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
        allowNull: false
    },
    valor: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
});

// Definir la asociación


module.exports = Provincia;
