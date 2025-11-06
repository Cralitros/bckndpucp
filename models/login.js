// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Login = sequelize.define('Login', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    dni: {
        type: DataTypes.STRING,
         allowNull: true
    },
    password: {
        type: DataTypes.STRING,
         allowNull: true
    },
    nivel: {
        type: DataTypes.STRING,
         allowNull: true
    },
    rol: {
        type: DataTypes.STRING,
         allowNull: true
    },
    nombres:{
        type: DataTypes.STRING,
         allowNull: true
    },
    apellidos:{
        type: DataTypes.STRING,
         allowNull: true
    },
    email:{
        type: DataTypes.STRING,
         allowNull: true
    },
    cargo:{
        type: DataTypes.STRING,
         allowNull: true
    }
    
}, {
  tableName: 'logins', // ← coincide con el nombre real en la BD
});


module.exports =Login; 
