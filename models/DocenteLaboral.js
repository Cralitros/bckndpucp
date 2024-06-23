// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteLaboral = sequelize.define('DocenteLaboral', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    trabajo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo_actual: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_empresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion_empresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono_empresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_corporativo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_personal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_alternativo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
});


module.exports =DocenteLaboral; 
