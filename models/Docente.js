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
         allowNull: true
        
    },
    apellidos: {
        type: DataTypes.STRING,
         allowNull: true
        
    },
    codigo: {
        type: DataTypes.STRING,
        primaryKey: true,        
    },
    digito: {
        type: DataTypes.STRING,
         allowNull: true        
    },
    domicilio: {
        type: DataTypes.STRING,
         allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
         allowNull: true
    },
    celular: {
        type: DataTypes.STRING,
         allowNull: true
    },
    estado_civil: {
        type: DataTypes.STRING,
        
    },
    numero_hijos: {
        type: DataTypes.STRING,
         allowNull: true
    },
    sexo: {
        type: DataTypes.STRING,
         allowNull: true
    },
    dni: {
        type: DataTypes.STRING,
         allowNull: true
    },
    especialidad: {
        type: DataTypes.STRING,
         allowNull: true
    },
    pasaporte: {
        type: DataTypes.STRING,
         allowNull: true
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
         allowNull: true
    },
    lugar_nacimiento: {
        type: DataTypes.STRING,
         allowNull: true
    },
    fallecimiento: {
        type: DataTypes.BOOLEAN,
         allowNull: true
    },
    fecha_fallecimiento: {
        type: DataTypes.DATEONLY,
         allowNull: true
    },
    banco: {
        type: DataTypes.STRING,
         allowNull: true
    },
    cuenta: {
        type: DataTypes.STRING,
         allowNull: true
    },
    afp: {
        type: DataTypes.STRING,
         allowNull: true
    },
    cussp: {
        type: DataTypes.STRING,
         allowNull: true
    },
    afiliacion: {
        type: DataTypes.STRING,
         allowNull: true
    },
    fecha_cv: {
        type: DataTypes.DATEONLY,
         allowNull: true
    },
    ruc: {
        type: DataTypes.STRING,
         allowNull: true
    },

    observaciones: {
        type: DataTypes.STRING,
         allowNull: true
    },

}, {
  tableName: 'docentes', // ← coincide con el nombre real en la BD
});


module.exports = Docente; 
