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
        
    },
    cargo_actual: {
        type: DataTypes.STRING,
        
    },
    tipo_empresa: {
        type: DataTypes.STRING,
        
    },
    direccion_empresa: {
        type: DataTypes.STRING,
        
    },
    telefono_empresa: {
        type: DataTypes.STRING,
        
    },
    correo_corporativo: {
        type: DataTypes.STRING,
        
    },
    correo_personal: {
        type: DataTypes.STRING,
        
    },
    correo_alternativo: {
        type: DataTypes.STRING,
        
    },
    contacto: {
        type: DataTypes.STRING,
        
    },
   
});


module.exports =DocenteLaboral; 
