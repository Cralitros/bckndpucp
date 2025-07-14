// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Docente = sequelize.define('Docente', {
    /*id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },*/
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    digito: {
        type: DataTypes.STRING,
        allowNull: false
    },
    domicilio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado_civil: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_hijos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pasaporte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    lugar_nacimiento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fallecimiento: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    fecha_fallecimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    banco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cuenta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    afp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cussp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    afiliacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_cv: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    ruc: {
        type: DataTypes.STRING,
        allowNull: false
    },

    observaciones: {
        type: DataTypes.STRING,
        allowNull: false
    },

});


module.exports = Docente; 
