// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteCurso = sequelize.define('DocenteCurso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_inicio:{
        type: DataTypes.DATEONLY,
        
    },
    fecha_fin:{
        type: DataTypes.DATEONLY,
        
    },
    modalidad: {
        type: DataTypes.STRING,
        
    },
    tipo: {
        type: DataTypes.STRING,
        
    },
    tipo_clase: {
        type: DataTypes.STRING,
        
    },
    estado: {
        type: DataTypes.STRING,
        
    },

    
});


module.exports =DocenteCurso; 
