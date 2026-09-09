// controllers/docentesInvestigaController.js
// Lógica de negocio del recurso DocenteInvestigadores. Extraída tal cual de la ruta
// original (routes/docentesInvestigaRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Docente, DocenteInvestigador } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /docentesinvestiga/report
async function reporte(req, res) {
  
    try {
  
      let general = await DocenteInvestigador.findAll();
      console.log(general);
  
  
      // Extrae los nombres de los campos del primer objeto y excluye 'createdAt' y 'updatedAt'
      const headers = Object.keys(general[0].dataValues).filter(
        (field) => field !== 'createdAt' && field !== 'updatedAt'
      );
  
      const columnWidths = Array.from({ length: headers.length }, () => 'auto');
      console.log(headers);
  
      // Convierte los nombres de campos en un array de encabezados
      const tableBody = [
        headers // Usamos los nombres de los campos como encabezados
      ];
      general.forEach(gen => {
        tableBody.push(headers.map(header => gen.dataValues[header]));
      });

      await enviarReporteTabla(res, {
        titulo: "REPORTE DE DOCENTE CATEGORIAS",
        subtitulo: "Lista de docentes por categoria",
        tableBody,
        columnWidths,
      });
    } catch (error) {
      res.json(error);
    }
  }


// GET /docentesinvestiga/total
async function total(req, res) {
  try {
    const total = await DocenteInvestigador.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /docentesinvestiga
async function listar(req, res) {
    try {
        const docenteLaborales = await DocenteInvestigador.findAll(
            { include: [Docente] }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /docentesinvestiga/cod/:codigodocentes
async function listarPorCodigoDocente(req, res) {
    try {
        const codigodocente = req.params.codigodocentes;
        const docenteLaborales = await DocenteInvestigador.findAll(
            {
                include: [Docente],
                where: { codigodocente },
            }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Crear un nuevo condicion
// POST /docentesinvestiga
async function crear(req, res) {
    try {
        const docenteLaborales = await DocenteInvestigador.create(req.body);
        res.status(201).json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un condicion
// PUT /docentesinvestiga/:codigodocentes
async function actualizar(req, res) {
    try {
        const codigodocente = req.params.codigodocentes;
        // Actualizar el registro de departamento en la base de datos
        await DocenteInvestigador.update(req.body, {
            where: { codigodocente },
        });

        res.status(201).json("Se actualizo correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar' });
    }
}

// Eliminar un condicion
// DELETE /docentesinvestiga/:id
async function eliminar(req, res) {
    try {
        const id = req.params.id;
        // Eliminar el registro de departamento de la base de datos
        await DocenteInvestigador.destroy({
            where: { id },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
}

module.exports = {
  reporte,
  total,
  listar,
  listarPorCodigoDocente,
  crear,
  actualizar,
  eliminar,
};
