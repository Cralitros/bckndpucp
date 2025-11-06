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
         allowNull: true
    },
    fecha_fin:{
        type: DataTypes.DATEONLY,
         allowNull: true
    },
    modalidad: {
        type: DataTypes.STRING,
         allowNull: true
    },
    tipo: {
        type: DataTypes.STRING,
         allowNull: true
    },
    tipo_clase: {
        type: DataTypes.STRING,
         allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
         allowNull: true
    },

    
}, {
  tableName: 'docentecursos', // ← coincide con el nombre real en la BD
});


module.exports =DocenteCurso; 
