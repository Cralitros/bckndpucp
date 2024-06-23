// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const DocenteEncuesta = sequelize.define('DocenteEncuesta', {
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
   
});


module.exports =DocenteEncuesta; 
