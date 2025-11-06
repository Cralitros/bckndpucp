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
         allowNull: true      
    }
}, {
  tableName: 'firmas', // ← coincide con el nombre real en la BD
});


module.exports =Firma; 
