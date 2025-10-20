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
        
    },
    apellidos: {
        type: DataTypes.STRING,
        
    },
    codigo: {
        type: DataTypes.STRING,
        primaryKey: true,
        
    },
    digito: {
        type: DataTypes.STRING,
        
    },
    domicilio: {
        type: DataTypes.STRING,
        
    },
    telefono: {
        type: DataTypes.STRING,
        
    },
    celular: {
        type: DataTypes.STRING,
        
    },
    estado_civil: {
        type: DataTypes.STRING,
        
    },
    numero_hijos: {
        type: DataTypes.STRING,
        
    },
    sexo: {
        type: DataTypes.STRING,
        
    },
    dni: {
        type: DataTypes.STRING,
        
    },
    especialidad: {
        type: DataTypes.STRING,
        
    },
    pasaporte: {
        type: DataTypes.STRING,
        
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        
    },
    lugar_nacimiento: {
        type: DataTypes.STRING,
        
    },
    fallecimiento: {
        type: DataTypes.BOOLEAN,
        
    },
    fecha_fallecimiento: {
        type: DataTypes.DATEONLY,
        
    },
    banco: {
        type: DataTypes.STRING,
        
    },
    cuenta: {
        type: DataTypes.STRING,
        
    },
    afp: {
        type: DataTypes.STRING,
        
    },
    cussp: {
        type: DataTypes.STRING,
        
    },
    afiliacion: {
        type: DataTypes.STRING,
        
    },
    fecha_cv: {
        type: DataTypes.DATEONLY,
        
    },
    ruc: {
        type: DataTypes.STRING,
        
    },

    observaciones: {
        type: DataTypes.STRING,
        
    },

});


module.exports = Docente; 
