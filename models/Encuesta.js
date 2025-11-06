// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Encuesta = sequelize.define('Encuesta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    preguntas: {
        type: DataTypes.STRING,
         allowNull: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
         allowNull: true
    },
    paprobado: {
        type: DataTypes.STRING,
         allowNull: true
    },
    totalpreguntas: {
        type: DataTypes.STRING,
         allowNull: true
    },


   
}, {
  tableName: 'encuesta', // ← coincide con el nombre real en la BD
});


module.exports =Encuesta; 
