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
         allowNull: true

    },
    semestre: {
        type: DataTypes.STRING,
         allowNull: true

    },
    nivel: {
        type: DataTypes.STRING,
         allowNull: true

    },
    creditos: {
        type: DataTypes.STRING,
         allowNull: true

    },
    areas: {
        type: DataTypes.STRING,
         allowNull: true

    },

}, {
  tableName: 'cursos', // ← coincide con el nombre real en la BD
});


module.exports =Curso; 
