// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DocenteInvestigador = sequelize.define('DocenteInvestigador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orcid: {
        type: DataTypes.STRING,
         allowNull: true
    },
    renacyt: {
        type: DataTypes.STRING,
         allowNull: true
    },
    grupo: {
        type: DataTypes.STRING,
         allowNull: true
    },
    nivel: {
        type: DataTypes.STRING,
         allowNull: true
    },
    registro: {
        type: DataTypes.STRING,
         allowNull: true
    },
    // Fecha en la que se registró el reconocimiento de investigador.
    // Se guarda como texto ISO, igual que `fecha` en `DocenteCategoria`: así no
    // hay sorpresas de zona horaria al leer y volver a escribir el valor.
    fechaRegistro: {
        type: DataTypes.STRING,
         allowNull: true
    },
    // Observaciones generales del investigador (último campo de la pestaña
    // "Información General").
    observaciones: {
        type: DataTypes.TEXT,
         allowNull: true
    },
    rol: {
        type: DataTypes.STRING,
         allowNull: true
    },
    reconocimiento: {
        type: DataTypes.STRING,
         allowNull: true
    },
    contenido: {
        type: DataTypes.STRING,
         allowNull: true
    },
    condicion: {
        type: DataTypes.STRING,
         allowNull: true
    },
    semestresInvestigacion: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    // Historial de reconocimientos del docente (pestaña "Reconocimientos").
    // Guarda un array JSON: [{ anio, nombre, categoria, unidad, observaciones }]
    //
    // Sustituye a las columnas fijas ri, pibpdu, gadi, sei, gadd, gadit y dfi,
    // que ya no se usan (sus datos se pasaron al historial con el script
    // `sql/migracion_reconocimientos_datos_y_limpieza.sql`).
    reconocimientos: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },

}, {
  tableName: 'docenteinvestigadors', // ← coincide con el nombre real en la BD
});


module.exports =DocenteInvestigador; 
