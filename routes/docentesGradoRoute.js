const express = require('express');
const router = express.Router();
const  Docente  = require('../models/Docente');
const  DocenteLaboral  = require('../models/DocenteGrados');



router.get('/', async (req, res) => {
    try {
        const docenteLaborales = await DocenteLaboral.findAll(
            { include: [Docente] }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:codigodocentes', async (req, res) => {
    try {
        const codigoDocente = req.params.codigodocentes;
        const docenteLaborales = await DocenteLaboral.findAll(
            {
                include: [Docente],
                where: { codigoDocente },
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
        const docenteLaborales = await DocenteLaboral.create(req.body);
        res.status(201).json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un condicion
router.put('/:codigodocentes', async (req, res) => {
    try {
        const codigoDocente = req.params.codigodocentes;
        // Actualizar el registro de departamento en la base de datos
        await DocenteLaboral.update(req.body, {
            where: { codigoDocente },
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
        const codigoDocente = req.params.codigodocentes;
        // Eliminar el registro de departamento de la base de datos
        await DocenteLaboral.destroy({
            where: { codigoDocente },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
});

module.exports = router;
