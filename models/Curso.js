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

    },
    semestre: {
        type: DataTypes.STRING,

    },
    nivel: {
        type: DataTypes.STRING,

    },
    creditos: {
        type: DataTypes.STRING,

    },
    areas: {
        type: DataTypes.STRING,

    },

});


module.exports =Curso; 
