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
        
    },
    fecha: {
        type: DataTypes.DATEONLY,
        
    },
    paprobado: {
        type: DataTypes.STRING,
        
    },
    totalpreguntas: {
        type: DataTypes.STRING,
        
    },


   
});


module.exports =Encuesta; 
