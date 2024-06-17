const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
 
const Condicion = sequelize.define('Condicion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    condicion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    
});


module.exports =  Condicion;
