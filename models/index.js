// models/index.js
const sequelize = require('../config/database');
const Docente = require('./Docente');
const Encuesta = require('./Encuesta');
const Curso = require('./Curso');
const DocenteEncuesta = require('./DocenteEncuesta');
const DocenteCategoria = require('./DocenteCategoria');
const DocenteCurso = require('./DocenteCurso');
const DocenteGrados = require('./DocenteGrados');
const DocenteInvestigador = require('./DocenteInvestigador');
const DocenteLaboral = require('./DocenteLaboral');
const Provincia = require('./Provincia');
const Departamento = require('./Departamento');
const Distrito = require('./Distrito');
const Banco = require('./Banco');
const Afp = require('./Afp');
const Plan = require('./Plan');
//const Condicion = require('./Condicion');
const Facultad = require('./Facultad');
const Escuela = require('./Escuela');
const Programas = require('./Programas');
const Login = require('./Login');
const Nacionalidad = require('./Nacionalidad');
const Area = require('./Area');
const DocenteInfo = require('./DocenteInfo');
const Firma = require('./Firma');


// Define las asociaciones aquí
Provincia.belongsTo(Departamento, { foreignKey: 'departamento_id' });
Departamento.hasMany(Provincia, { foreignKey: 'departamento_id' });

Distrito.belongsTo(Provincia, { foreignKey: 'provincia_id' });
Provincia.hasMany(Distrito, { foreignKey: 'provincia_id' });


DocenteCategoria.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteCategoria, { foreignKey: 'codigoDocente' });


DocenteGrados.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteGrados, { foreignKey: 'codigoDocente' });

Docente.belongsTo(Departamento, { foreignKey: 'idDepartamento' });
Departamento.hasMany(Docente, { foreignKey: 'idDepartamento' });

Docente.belongsTo(Provincia, { foreignKey: 'idProvincia' });
Provincia.hasMany(Docente, { foreignKey: 'idProvincia' });

Docente.belongsTo(Distrito, { foreignKey: 'idDistrito' });
Distrito.hasMany(Docente, { foreignKey: 'idDistrito' });

Docente.belongsTo(Nacionalidad, { foreignKey: 'idNacionalidad' });
Nacionalidad.hasMany(Docente, { foreignKey: 'idNacionalidad' });

DocenteInvestigador.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteInvestigador, { foreignKey: 'codigoDocente' });

DocenteLaboral.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteLaboral, { foreignKey: 'codigoDocente' });

DocenteEncuesta.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteEncuesta, { foreignKey: 'codigoDocente' });

DocenteInfo.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteInfo, { foreignKey: 'codigoDocente' });

DocenteEncuesta.belongsTo(Encuesta, { foreignKey: 'codigoEncuesta' });
Encuesta.hasMany(DocenteEncuesta, { foreignKey: 'codigoEncuesta' });

DocenteEncuesta.belongsTo(Curso, { foreignKey: 'codigoCurso' });
Curso.hasMany(DocenteEncuesta, { foreignKey: 'codigoCurso' });

DocenteCurso.belongsTo(Docente, { foreignKey: 'codigoDocente' });
Docente.hasMany(DocenteCurso, { foreignKey: 'codigoDocente' });

Docente.belongsToMany(Curso, { through: DocenteCurso, foreignKey: 'codigoDocente', otherKey: 'codigoCurso' });
Curso.belongsToMany(Docente, { through: DocenteCurso, foreignKey: 'codigoCurso', otherKey: 'codigoDocente' });

DocenteCurso.belongsTo(Curso, { foreignKey: 'codigoCurso' });
Curso.hasMany(DocenteCurso, { foreignKey: 'codigoCurso' });

/*DocenteCategoria.belongsTo(Condicion, { foreignKey: 'idCondicion' });
Condicion.hasMany(DocenteCategoria, { foreignKey: 'idCondicion' });*/

Curso.belongsTo(Plan, { foreignKey: 'codigoPlan' });
Plan.hasMany(Curso, { foreignKey: 'codigoPlan' });

Escuela.belongsTo(Facultad, { foreignKey: 'idFacultad' });
Facultad.hasMany(Escuela, { foreignKey: 'idFacultad' });

Programas.belongsTo(Escuela, { foreignKey: 'idEscuela' });
Escuela.hasMany(Programas, { foreignKey: 'idEscuela' });

Curso.belongsTo(Programas, { foreignKey: 'idPrograma' });
Programas.hasMany(Curso, { foreignKey: 'idPrograma' });


Firma.belongsTo(Login, { foreignKey: 'idLogin' });
Login.hasMany(Firma, { foreignKey: 'idLogin' });

// Exporta todos los modelos
module.exports = {
    Docente,
    Encuesta,
    DocenteEncuesta,
    DocenteCategoria,
    DocenteCurso,
    DocenteGrados,
    DocenteInvestigador,
    DocenteLaboral,
    DocenteInfo,
    Curso,
    Departamento,
    Provincia,
    Distrito,
    Programas,
   // Condicion,
    Facultad,
    Escuela,
    Login,
    Banco,
    Nacionalidad,
    Afp,
    Area,
    Plan,
    Firma
};
