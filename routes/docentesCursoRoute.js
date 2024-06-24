const express = require('express');
const router = express.Router();

const { Docente,  DocenteCurso } = require('../models');



router.get('/', async (req, res) => {
    try {
        const docenteLaborales = await DocenteCurso.findAll(
            { include: [Docente] }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/docente/:codigoDocente', async (req, res) => {
    try {
        const codigoDocente = req.params.codigoDocente;
        const docenteLaborales = await DocenteCurso.findAll(
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
router.get('/curso/:codigoCurso', async (req, res) => {
    try {
        const codigoCurso = req.params.codigoCurso;
        const docenteLaborales = await DocenteCurso.findAll(
            {
                include: [Docente],
                where: { codigoCurso },
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
        const docenteLaborales = await DocenteCurso.create(req.body);
        res.status(201).json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un condicion
router.put('/docente/:codigodocentes', async (req, res) => {
    try {
        const codigoDocente = req.params.codigoDocente;
        // Actualizar el registro de departamento en la base de datos
        await DocenteCurso.update(req.body, {
            where: { codigoDocente },
        });

        res.status(201).json("Se actualizo correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar' });
    }
});
// Actualizar un condicion
router.put('/curso/:codigoCurso', async (req, res) => {
    try {
        const codigoCurso = req.params.codigoCurso;
        // Actualizar el registro de departamento en la base de datos
        await DocenteCurso.update(req.body, {
            where: { codigoCurso },
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
        await DocenteCurso.destroy({
            where: { id },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
});

module.exports = router;
