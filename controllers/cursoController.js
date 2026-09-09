// controllers/cursoController.js
// Lógica de negocio del recurso Cursos. Extraída tal cual de la ruta
// original (routes/cursoRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Curso, Facultad, Escuela, Programas, Plan } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /curso/report
async function reporte(req, res) {
  try {

    let general = await Curso.findAll({
      include: [
        {
          model: Programas,
          include: {
            model: Escuela,
            include: {
              model: Facultad,
            }
          }
        },
        {
          model: Plan
        }
      ]
    });


    console.log("11111111111111");

    // Extrae los nombres de los campos del primer objeto y excluye 'createdAt' y 'updatedAt'
    const headers = Object.keys(general[0].dataValues).filter(
      (field) => field !== 'createdAt' && field !== 'updatedAt' && field !== 'idPrograma' && field !== 'codigoPlan'
    );
    headers.push('Escuela');
    headers.push('Facultad');


    const columnWidths = Array.from({ length: headers.length }, () => 'auto');
    console.log(headers);

    // Convierte los nombres de campos en un array de encabezados
    const tableBody = [
      headers // Usamos los nombres de los campos como encabezados
    ];
    console.log("444444444444444");
    general.forEach(gen => {
      tableBody.push(headers.map(header => {
        // Si el header es 'Facultad' (que es un objeto), obtenemos el nombre
        if (header === 'Programa') {
          console.log(gen.dataValues.Programa);

          return gen.dataValues.Programa.programa; // 'nombre' es el atributo deseado del objeto Facultad
        } else if (header === 'Escuela') {
          return gen.dataValues.Programa.Escuela.nombre ? gen.dataValues.Programa.Escuela.nombre : ""; // 'nombre' es el atributo deseado del objeto Facultad
        } else if (header === 'Facultad') {
          return gen.dataValues.Programa.Escuela.Facultad.nombre ? gen.dataValues.Programa.Escuela.Facultad.nombre : ""; // 'nombre' es el atributo deseado del objeto Facultad
        } else if (header === 'Plan') {
          return gen.dataValues.Plan.nombre ? gen.dataValues.Plan.nombre : ""; // 'nombre' es el atributo deseado del objeto Facultad
        }
        return gen.dataValues[header];
      }));
    });

    console.log(tableBody);
    //console.log("***************************");


    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE ESCUELA Y PROGRAMAS',
      subtitulo: 'Lista de escuela y progranas',
      tableBody,
      columnWidths,
    });
  } catch (error) {
    res.json(error);
  }
}

// GET /curso/total
async function total(req, res) {
  try {
    const total = await Curso.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /curso
async function listar(req, res) {
  let curso;
  try {
    curso = await Curso.findAll({
      include: [
        {
          model: Programas,
          include: {
            model: Escuela,
            include: {
              model: Facultad,
            }
          }
        },
        {
          model: Plan
        }
      ]
    });
  } catch (error) {
    res.json(error);
  }
  res.json(curso);
}

// GET /curso/:codigo
async function listarPorCodigo(req, res) {
  let curso;
  try {
    curso = await Curso.findAll({
      include: [{
        model: Programas,
        include: {
          model: Escuela,
          include: {
            model: Facultad,
          }
        }
      }],
      where: { codigo: req.params.codigo }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(curso);
}

// POST /curso
async function crear(req, res) {
  let departamento;
  try {
    console.log(req.params);
    departamento = await Curso.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
}

// PUT /curso/:codigo
async function actualizar(req, res) {
  let departamento;
  try {
    console.log(req.body);
    departamento = await Curso.update(req.body, {
      where: { codigo: req.params.codigo }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
}

// DELETE /curso/:codigo
async function eliminar(req, res) {
  let result;
  try {
    result = await Curso.destroy({
      where: { codigo: req.params.codigo }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
}

module.exports = {
  reporte,
  total,
  listar,
  listarPorCodigo,
  crear,
  actualizar,
  eliminar,
};
