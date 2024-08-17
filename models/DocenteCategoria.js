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
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    condiciondap: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dedicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    labor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoriadap: {
        type: DataTypes.STRING,
        allowNull: false
    },

});


module.exports =DocenteCategoria; 
