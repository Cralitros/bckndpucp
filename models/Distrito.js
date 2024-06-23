// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Distrito = sequelize.define('Distrito', {
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


module.exports = Distrito;
