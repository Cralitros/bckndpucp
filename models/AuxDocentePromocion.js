// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteLaboral = sequelize.define('DocenteLaboral', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ratificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
   
});


module.exports =DocenteLaboral; 
