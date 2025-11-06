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
         allowNull: true
    },
    cargo_actual: {
        type: DataTypes.STRING,
         allowNull: true
    },
    tipo_empresa: {
        type: DataTypes.STRING,
         allowNull: true
    },
    direccion_empresa: {
        type: DataTypes.STRING,
         allowNull: true
    },
    telefono_empresa: {
        type: DataTypes.STRING,
         allowNull: true
    },
    correo_corporativo: {
        type: DataTypes.STRING,
         allowNull: true
    },
    correo_personal: {
        type: DataTypes.STRING,
         allowNull: true
    },
    correo_alternativo: {
        type: DataTypes.STRING,
         allowNull: true
    },
    contacto: {
        type: DataTypes.STRING,
         allowNull: true
    },
   
}, {
  tableName: 'docentelaborals', // ← coincide con el nombre real en la BD
});


module.exports =DocenteLaboral; 
