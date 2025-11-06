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
         allowNull: true
    },
    renacyt: {
        type: DataTypes.STRING,
         allowNull: true
    },
    grupo: {
        type: DataTypes.STRING,
         allowNull: true
    },
    nivel: {
        type: DataTypes.STRING,
         allowNull: true
    },
    registro: {
        type: DataTypes.STRING,
         allowNull: true
    },
    rol: {
        type: DataTypes.STRING,
         allowNull: true
    },
    reconocimiento: {
        type: DataTypes.STRING,
         allowNull: true
    },
    contenido: {
        type: DataTypes.STRING,
         allowNull: true
    },
    ri:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    pibpdu:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    gadi:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    sei:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    gadd:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    gadit:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    dfi:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
   
}, {
  tableName: 'docenteinvestigadors', // ← coincide con el nombre real en la BD
});


module.exports =DocenteInvestigador; 
