const express = require('express');
const router = express.Router();
const Condicion  = require('../models/Condicion');

/*router.get('/', condicionController.encontrarTodo);
router.get('/:id', condicionController.encontrarTodo);
router.post('/', condicionController.crear);
router.put('/:id', condicionController.actualizar);
router.delete('/:id', condicionController.eliminar);*/
// otras rutas
// Obtener todos los condicions
router.get('/', async (req, res) => {
    let condiciones;
    try {
        condiciones = await Condicion.findAll();
        res.json(condiciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const condiciones = await Condicion.findAll(
            {
                where: { id },
            }
        );
        res.json(condiciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Crear un nuevo condicion
router.post('/', async (req, res) => {
    try {
        const condiciones = await Condicion.create(req.body);
        res.status(201).json(condiciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un condicion
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // Actualizar el registro de departamento en la base de datos
        await Condicion.update(req.body, {
            where: { id },
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
        await Condicion.destroy({
            where: { id },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
});

module.exports = router;


