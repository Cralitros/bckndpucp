// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Docente = require('./Docente');
const Curso = require('./Curso');



const Encuesta = sequelize.define('Encuesta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    preguntas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    paprobado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalpreguntas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigoCurso:{
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: Curso,
            key: 'codigo'
        }
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


module.exports =Encuesta; 
