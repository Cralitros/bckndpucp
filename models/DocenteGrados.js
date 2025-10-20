// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteGrados = sequelize.define('DocenteGrados', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    grado: {
        type: DataTypes.JSON,
        
    },
    maximo_grado:{
        type: DataTypes.STRING,
        
    },
    pais_grado:{
        type: DataTypes.STRING,
        
    },
    bgac:{
        type: DataTypes.BOOLEAN,
        
    },
    bga:{
        type: DataTypes.TEXT('long'),
        
    },
    prestamoc:{
        type: DataTypes.BOOLEAN,
        
    },
    prestamo:{
        type: DataTypes.TEXT('long'),
        
    },
   /* profesion: {
        type: DataTypes.STRING,
        
    },*/
  /*  revalidado: {
        type: DataTypes.STRING,
        
    },
    lugar_obtencion: {
        type: DataTypes.TEXT('long'),
        
    },
    fecha_obtencion: {
        type: DataTypes.DATEONLY,
        
    },*/
   
});


module.exports =DocenteGrados; 
