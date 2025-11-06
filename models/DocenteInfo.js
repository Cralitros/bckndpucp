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
         allowNull: true
    },
    dedicacion:{
        type: DataTypes.STRING,
         allowNull: true
    },
    inicio_dictado: {
        type: DataTypes.DATEONLY,
         allowNull: true
    },
    fin_dictado: {
        type: DataTypes.DATEONLY,
         allowNull: true
    },
    semestre:{
        type: DataTypes.STRING,
         allowNull: true
    },
    modo_ingreso:{
        type: DataTypes.STRING,
         allowNull: true
    },
    departamento:{
        type: DataTypes.STRING,
         allowNull: true
    },
    lugar_dictado:{
        type: DataTypes.STRING,
         allowNull: true
    },
    pais_dictado:{
        type: DataTypes.STRING,
         allowNull: true
    },
    dias_extranjero:{
        type: DataTypes.STRING,
         allowNull: true
    },
    labor_administrativa:{
        type: DataTypes.STRING,
         allowNull: true
    },
    rol_anterior:{
        type: DataTypes.STRING,
         allowNull: true
    },
    comisiones:{
        type: DataTypes.STRING,
         allowNull: true
    },
    emision_carne: {
        type: DataTypes.DATEONLY,
         allowNull: true
    },
    prestamos:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    sanciones:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    observadap:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    historico:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
    felicitacion:{
        type: DataTypes.TEXT('long'),
         allowNull: true
    },
   
}, {
  tableName: 'docenteinfos', // ← coincide con el nombre real en la BD
});


module.exports =DocenteInfo; 
