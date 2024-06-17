// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Docente = require('./Docente');



const DocenteCategoria = sequelize.define('DocenteCategoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    condicion: {
        type: DataTypes.STRING,
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


module.exports =DocenteCategoria; 
