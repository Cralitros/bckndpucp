// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Docente = require('./Docente');
const Curso = require('./Curso');



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
    codigoDocente:{
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: Docente,
            key: 'codigo'
        }
    },
    codigoCurso:{
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: Curso,
            key: 'codigo'
        }
    },
});


module.exports =DocenteCurso; 
