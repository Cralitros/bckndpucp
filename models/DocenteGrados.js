// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteGrados = sequelize.define('DocenteGrados', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    grado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    revalidado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lugar_obtencion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_obtencion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
   
});


module.exports =DocenteGrados; 
