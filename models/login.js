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
        
    },
    password: {
        type: DataTypes.STRING,
        
    },
    nivel: {
        type: DataTypes.STRING,
        
    },
    rol: {
        type: DataTypes.STRING,
        
    },
    nombres:{
        type: DataTypes.STRING,
        
    },
    apellidos:{
        type: DataTypes.STRING,
        
    },
    email:{
        type: DataTypes.STRING,
        
    },
    cargo:{
        type: DataTypes.STRING,
        
    }
    
});


module.exports =Login; 
