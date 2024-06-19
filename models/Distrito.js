// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Provincia = require('./Provincia');

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
    provincia_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Provincia,
            key: 'id'
        }
    },
});


module.exports = Distrito;
