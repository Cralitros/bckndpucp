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
        allowNull: false
    },
    fecha_fin:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    modalidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_clase: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },

    
});


module.exports =DocenteCurso; 
