const express = require('express');
const router = express.Router();

const { Docente, DocenteInvestigador } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

router.get('/report', async (req, res) => {
  
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
  });


router.get('/total', async (req, res) => {
  try {
    const total = await DocenteInvestigador.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});

router.get('/', async (req, res) => {
    try {
        const docenteLaborales = await DocenteInvestigador.findAll(
            { include: [Docente] }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/cod/:codigodocentes', async (req, res) => {
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
});


// Crear un nuevo condicion
router.post('/', async (req, res) => {
    try {
        const docenteLaborales = await DocenteInvestigador.create(req.body);
        res.status(201).json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un condicion
router.put('/:codigodocentes', async (req, res) => {
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
});

// Eliminar un condicion
router.delete('/:id', async (req, res) => {
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
});

module.exports = router;
