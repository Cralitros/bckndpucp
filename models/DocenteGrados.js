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
         allowNull: true
    },
    maximo_grado:{
        type: DataTypes.STRING,
         allowNull: true
    },
    pais_grado:{
        type: DataTypes.STRING,
         allowNull: true
    },
    bgac:{
        type: DataTypes.BOOLEAN,
         allowNull: true
    },
    bga:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    prestamoc:{
        type: DataTypes.BOOLEAN,
         allowNull: true
    },
    prestamo:{
        type: DataTypes.TEXT('long'),
         allowNull: true
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
   
}, {
  tableName: 'docentegrados', // ← coincide con el nombre real en la BD
});


module.exports =DocenteGrados; 
