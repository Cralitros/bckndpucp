// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Docente = require('./Docente');



const DocenteGrados = sequelize.define('DocenteGrados', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    grado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    revalidado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lugar_obtencion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_obtencion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    codigoDocente:{
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: Docente,
            key: 'codigo'
        }
    },
});


module.exports =DocenteGrados; 
