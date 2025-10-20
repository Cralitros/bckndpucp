// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteCategoria = sequelize.define('DocenteCategoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING,
      
    },
    fecha: {
        type: DataTypes.STRING,
      
    },
    categoria: {
        type: DataTypes.TEXT('long'),
      
    },
    condiciondap: {
        type: DataTypes.STRING,
      
    },
    dedicacion: {
        type: DataTypes.STRING,
      
    },
    labor: {
        type: DataTypes.STRING,
      
    },
    categoriadap: {
        type: DataTypes.STRING,
      
    },
    ratificado: {
        type: DataTypes.STRING,
        
    },
    hContratado:{
        type: DataTypes.STRING,
      
    },
    hAuxiliar:{
        type: DataTypes.STRING,
      
    },
    hPrincipal:{
        type: DataTypes.STRING,
      
    },
    hAsociado:{
        type: DataTypes.STRING,
      
    },
    dedicacionJubilacion:{
        type: DataTypes.STRING,
      
    },
    categoriaJubilacion:{
        type: DataTypes.STRING,
      
    }

});


module.exports =DocenteCategoria; 
