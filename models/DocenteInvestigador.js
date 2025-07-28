// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteInvestigador = sequelize.define('DocenteInvestigador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orcid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    renacyt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grupo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reconocimiento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contenido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ri:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    pibpdu:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    gadi:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    sei:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    gadd:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    gadit:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    dfi:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
   
});


module.exports =DocenteInvestigador; 
