// models/Ciudad.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Departamento = require('./Departamento');
const Distrito = require('./Distrito');

const Provincia = sequelize.define('Provincia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departamento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Departamento,
            key: 'id'
        }
    },
});

// Definir la asociación
Distrito.belongsTo(Provincia, { foreignKey: 'provincia_id' });
Provincia.hasMany(Distrito, { foreignKey: 'provincia_id' });


module.exports = Provincia;
