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
        
    },
    renacyt: {
        type: DataTypes.STRING,
        
    },
    grupo: {
        type: DataTypes.STRING,
        
    },
    nivel: {
        type: DataTypes.STRING,
        
    },
    registro: {
        type: DataTypes.STRING,
        
    },
    rol: {
        type: DataTypes.STRING,
        
    },
    reconocimiento: {
        type: DataTypes.STRING,
        
    },
    contenido: {
        type: DataTypes.STRING,
        
    },
    ri:{
        type: DataTypes.TEXT('long'),
        
    },
    pibpdu:{
        type: DataTypes.TEXT('long'),
        
    },
    gadi:{
        type: DataTypes.TEXT('long'),
        
    },
    sei:{
        type: DataTypes.TEXT('long'),
        
    },
    gadd:{
        type: DataTypes.TEXT('long'),
        
    },
    gadit:{
        type: DataTypes.TEXT('long'),
        
    },
    dfi:{
        type: DataTypes.TEXT('long'),
        
    },
   
});


module.exports =DocenteInvestigador; 
