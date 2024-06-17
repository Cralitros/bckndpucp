const express = require('express');
const router = express.Router();
const { Condicion } = require('../models/Condicion');
const { Docente } = require('../models/Docente');
const {DocenteGrados} = require('../models/DocenteGrados');
const {DocenteLaboral} = require('../models/DocenteLaboral');
const {DocenteCurso} = require('../models/DocenteCurso');
const {DocenteCategoria} = require('../models/DocenteCategoria');
const {DocenteInvestigador} = require('../models/DocenteInvestigador');


/*router.get('/', docenteController.encontrarTodo);
router.get('/:codigoProfesor', docenteController.encontrarTodo);
router.post('/', docenteController.crear);
router.put('/:codigoProfesor', docenteController.actualizar);
router.delete('/:codigoProfesor', docenteController.eliminar);
// otras rutas
module.exports = router;*/

router.get('/', async (req, res) => {
    try {
        const docentes = await Docente.findAll(
            { include: [Condicion, DocenteGrados, DocenteLaboral, DocenteCategoria,DocenteCurso,DocenteInvestigador] }
        );
        res.json(docentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:codigodocentes', async (req, res) => {
    try {
        const codigodocentes = req.params.codigodocentes;
        const docentes = await Docente.findAll(
            {
                include: [Condicion, DocenteGrados, DocenteLaboral, DocenteCategoria,DocenteCurso,DocenteInvestigador],
                where: { codigodocentes },
            }
        );
        res.json(docentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Crear un nuevo condicion
router.post('/', async (req, res) => {
    try {
        const docentes = await Docente.create(req.body);
        res.status(201).json(docentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un condicion
router.put('/:codigodocentes', async (req, res) => {
    try {
        const codigodocentes = req.params.codigodocentes;
        // Actualizar el registro de departamento en la base de datos
        await Docente.update(req.body, {
            where: { codigodocentes },
        });

        res.status(201).json("Se actualizo correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar' });
    }
});

// Eliminar un condicion
router.delete('/:codigodocentes', async (req, res) => {
    try {
        const codigodocentes = req.params.codigodocentes;
        // Eliminar el registro de departamento de la base de datos
        await Docente.destroy({
            where: { codigodocentes },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
});

module.exports = router;
