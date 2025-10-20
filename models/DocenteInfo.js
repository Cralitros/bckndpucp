// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteInfo = sequelize.define('DocenteInfo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria: {
        type: DataTypes.STRING,
        
    },
    dedicacion:{
        type: DataTypes.STRING,
        
    },
    inicio_dictado: {
        type: DataTypes.DATEONLY,
        
    },
    fin_dictado: {
        type: DataTypes.DATEONLY,
        
    },
    semestre:{
        type: DataTypes.STRING,
        
    },
    modo_ingreso:{
        type: DataTypes.STRING,
        
    },
    departamento:{
        type: DataTypes.STRING,
        
    },
    lugar_dictado:{
        type: DataTypes.STRING,
        
    },
    pais_dictado:{
        type: DataTypes.STRING,
        
    },
    dias_extranjero:{
        type: DataTypes.STRING,
        
    },
    labor_administrativa:{
        type: DataTypes.STRING,
        
    },
    rol_anterior:{
        type: DataTypes.STRING,
        
    },
    comisiones:{
        type: DataTypes.STRING,
        
    },
    emision_carne: {
        type: DataTypes.DATEONLY,
        
    },
    prestamos:{
        type: DataTypes.TEXT('long'),
        
    },
    sanciones:{
        type: DataTypes.TEXT('long'),
        
    },
    observadap:{
        type: DataTypes.TEXT('long'),
        
    },
    historico:{
        type: DataTypes.TEXT('long'),
        
    },
    felicitacion:{
        type: DataTypes.TEXT('long'),
        
    },
   
});


module.exports =DocenteInfo; 
