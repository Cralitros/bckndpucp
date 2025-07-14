// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteGrados = sequelize.define('DocenteInfo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    grado: {
        type: DataTypes.JSON,
        allowNull: false
    },
    maximo_grado:{
        type: DataTypes.STRING,
        allowNull: false
    },
    pais_grado:{
        type: DataTypes.STRING,
        allowNull: false
    },
   /* profesion: {
        type: DataTypes.STRING,
        allowNull: false
    },*/
  /*  revalidado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lugar_obtencion: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    fecha_obtencion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },*/
   
});


module.exports =DocenteGrados; 
