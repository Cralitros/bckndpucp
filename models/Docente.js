// models/Distrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Condicion = require('./Condicion');
const DocenteCategoria = require('./DocenteCategoria');
const DocenteCurso = require('./DocenteCurso');
const DocenteEncuesta = require('./DocenteEncuesta');
const DocenteGrados = require('./DocenteGrados');
const DocenteInvestigador = require('./DocenteInvestigador');
const DocenteLaboral = require('./DocenteLaboral');

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
    nacionalidad: {
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
DocenteCategoria.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteCategoria, { foreignKey: 'codigoDocente' });

DocenteCurso.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteCurso, { foreignKey: 'codigoDocente' });

DocenteEncuesta.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteEncuesta, { foreignKey: 'codigoDocente' });

DocenteGrados.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteGrados, { foreignKey: 'codigoDocente' });

DocenteInvestigador.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteInvestigador, { foreignKey: 'codigoDocente' });

DocenteLaboral.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteLaboral, { foreignKey: 'codigoDocente' });

module.exports =Docente; 
