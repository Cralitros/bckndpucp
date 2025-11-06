// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteCategoria = sequelize.define('DocenteCategoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categoria: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    condiciondap: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dedicacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    labor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categoriadap: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ratificado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hContratado: {
        type: DataTypes.STRING,
        allowNull: true

    },
    hAuxiliar: {
        type: DataTypes.STRING,
        allowNull: true

    },
    hPrincipal: {
        type: DataTypes.STRING,
        allowNull: true

    },
    hAsociado: {
        type: DataTypes.STRING,
        allowNull: true

    },
    hProfesorVisita: {
        type: DataTypes.STRING,
        allowNull: true

    },
    hInstructor: {
        type: DataTypes.STRING,
        allowNull: true

    },
    hJefePract: {
        type: DataTypes.STRING,
        allowNull: true

    },
    hAyudante: {
        type: DataTypes.STRING,
        allowNull: true

    },
    hAsistente: {
        type: DataTypes.STRING,
        allowNull: true

    },
    dedicacionJubilacion: {
        type: DataTypes.STRING,

    },
    categoriaJubilacion: {
        type: DataTypes.STRING,

    }

}, {
  tableName: 'docentecategoria', // ← coincide con el nombre real en la BD
});


module.exports = DocenteCategoria; 
