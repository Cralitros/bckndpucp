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


   
});


module.exports =Encuesta; 
