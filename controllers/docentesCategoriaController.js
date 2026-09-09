// controllers/docentesCategoriaController.js
// Lógica de negocio del recurso DocenteCategorias. Extraída tal cual de la ruta
// original (routes/docentesCategoriaRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Docente, DocenteCategoria, Condicion } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /docentescategoria/report
async function reporte(req, res) {
  
    try {
  
      let docCateg = await DocenteCategoria.findAll();
      console.log(docCateg);
  
  
      // Extrae los nombres de los campos del primer objeto y excluye 'createdAt' y 'updatedAt'
      const headers = Object.keys(docCateg[0].dataValues).filter(
        (field) => field !== 'createdAt' && field !== 'updatedAt'
      );
  
      const columnWidths = Array.from({ length: headers.length }, () => 'auto');
      console.log(headers);
  
      // Convierte los nombres de campos en un array de encabezados
      const tableBody = [
        headers // Usamos los nombres de los campos como encabezados
      ];
      docCateg.forEach(docCat => {
        tableBody.push(headers.map(header => docCat.dataValues[header]));
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

// GET /docentescategoria/total
async function total(req, res) {
  try {
    const total = await DocenteCategoria.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /docentescategoria
async function listar(req, res) {
    try {
        const docenteLaborales = await DocenteCategoria.findAll(
            { include: [Docente] }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /docentescategoria/:codigodocentes
async function listarPorCodigoDocente(req, res) {
    try {
        const codigoDocente = req.params.codigodocentes;
        const docenteLaborales = await DocenteCategoria.findAll(
            {
                include: [Docente],
                where: { codigoDocente },
            }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Crear un nuevo condicion
// POST /docentescategoria
async function crear(req, res) {
    try {
        const docenteLaborales = await DocenteCategoria.create(req.body);
        res.status(201).json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un condicion
// PUT /docentescategoria/:codigodocentes
async function actualizar(req, res) {
    try {
        const codigoDocente = req.params.codigodocentes;
        console.log("*************ACTUALIZAR******");
        
        console.log(req.body);
        console.log("**********ACTUALIZAR*********");
        
        // Actualizar el registro de departamento en la base de datos
        await DocenteCategoria.update(req.body, {
            where: { codigoDocente },
        });

        res.status(201).json("Se actualizo correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar' });
    }
}

// Eliminar un condicion
// DELETE /docentescategoria/:id
async function eliminar(req, res) {
    try {
        const id = req.params.id;
        // Eliminar el registro de departamento de la base de datos
        await DocenteCategoria.destroy({
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
