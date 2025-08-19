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
        allowNull: false
    },
    dedicacion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    inicio_dictado: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fin_dictado: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    semestre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    modo_ingreso:{
        type: DataTypes.STRING,
        allowNull: false
    },
    departamento:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lugar_dictado:{
        type: DataTypes.STRING,
        allowNull: false
    },
    pais_dictado:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dias_extranjero:{
        type: DataTypes.STRING,
        allowNull: false
    },
    labor_administrativa:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rol_anterior:{
        type: DataTypes.STRING,
        allowNull: false
    },
    comisiones:{
        type: DataTypes.STRING,
        allowNull: false
    },
    emision_carne: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    prestamos:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    sanciones:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    observadap:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    historico:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    felicitacion:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
   
});


module.exports =DocenteInfo; 
