// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Docente = require('./Docente');



const Curso = sequelize.define('Curso', {
    codigo: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semestre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creditos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    areas: {
        type: DataTypes.STRING,
        allowNull: false
    },

});


module.exports =Curso; 
