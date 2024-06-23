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
   
});


module.exports =DocenteInvestigador; 
