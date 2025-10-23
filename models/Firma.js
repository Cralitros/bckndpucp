// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Firma = sequelize.define('Firma', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    firma: {
        type: DataTypes.TEXT('long'),        
    },
    iniciales: {
        type: DataTypes.STRING,        
    }
});


module.exports =Firma; 
