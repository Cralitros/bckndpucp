// controllers/docentesGradoController.js
// Lógica de negocio del recurso DocenteGrados. Extraída tal cual de la ruta
// original (routes/docentesGradoRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Docente, DocenteGrados } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /docentesgrado/report
async function reporte(req, res) {
  
    try {
  
      let general = await DocenteGrados.findAll();
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

// GET /docentesgrado/total
async function total(req, res) {
  try {
    const total = await DocenteGrados.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /docentesgrado
async function listar(req, res) {
    try {
        const docenteGrados = await DocenteGrados.findAll(
            { include: [Docente] }
        );
        res.json(docenteGrados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /docentesgrado/:codigodocentes
async function listarPorCodigoDocente(req, res) {
    try {
        const codigoDocente = req.params.codigodocentes;
        const docenteGrados = await DocenteGrados.findAll(
            {
                include: [Docente],
                where: { codigoDocente },
            }
        );
        res.json(docenteGrados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Crear un nuevo condicion
// POST /docentesgrado
async function crear(req, res) {
    try {
      console.log('gradosss');
      
      console.log(req.body);
      
        const docenteGrados = await DocenteGrados.create(req.body);
        res.status(201).json(docenteGrados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un condicion
// PUT /docentesgrado/:codigodocentes
async function actualizar(req, res) {
    try {
        const codigoDocente = req.params.codigodocentes;
        // Actualizar el registro de departamento en la base de datos
        await DocenteGrados.update(req.body, {
            where: { codigoDocente },
        });

        res.status(201).json("Se actualizo correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar' });
    }
}

// Eliminar un condicion
// DELETE /docentesgrado/:id
async function eliminar(req, res) {
    try {
        const id = req.params.id;
        // Eliminar el registro de departamento de la base de datos
        await DocenteGrados.destroy({
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
