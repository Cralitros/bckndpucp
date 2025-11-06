const express = require('express');
const router = express.Router();
const { Firma, Login } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*router.get('/', condicionController.encontrarTodo);
router.get('/:id', condicionController.encontrarTodo);
router.post('/', condicionController.crear);
router.put('/:id', condicionController.actualizar);
router.delete('/:id', condicionController.eliminar);*/
// otras rutas
// Obtener todos los condicions
router.get('/', async (req, res) => {
    try {
        const firmas = await Firma.findAll(
            {
                include: [{
                    model: Login,
                }]
            }
        );
        res.json(firmas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/total', async (req, res) => {
  try {
    const total = await Firma.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});

router.get('/:id', async (req, res) => {
    try {
        const idLogin = req.params.id;
        console.log(idLogin);
        

        const firma = await Firma.findAll(
            {
                where: { id },
                include: [{
                    model: Login,
                }]
            }
        );
        console.log(firma);
        res.json(firma);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/total', async (req, res) => {
  try {
    const total = await Firma.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});

router.get('/dni/:dni', async (req, res) => {
    try {
        const dni = req.params.dni;
        console.log(dni);
        console.log("********************");
        

        const firma = await Firma.findAll(
            {
                
                include: [{
                    model: Login,
                    attributes: ['dni', 'nombres','apellidos'], // solo campos específicos
                    where: { dni },
                }]
            }
        );
        console.log(firma);
        res.json(firma);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login de usuario
router.post('/', async (req, res) => {
    let firmas;
    try {
        console.log(req.params);
        firmas = await Firma.create(req.body);
    } catch (error) {
        res.json(error);
    }
    res.json(firmas);
});

// Actualizar un condicion
router.put('/:id', async (req, res) => {
    let firmas;
    try {
        console.log(req.body);
        firmas = await Firma.update(req.body, {
            where: { id: req.params.id }
        });
    } catch (error) {
        res.json(error);
    }
    res.json(firmas);
});

// Eliminar un condicion
router.delete('/:id', async (req, res) => {
    let firmas;
    try {
        firmas = await Firma.destroy({
            where: { id: req.params.id }
        });
    } catch (error) {
        res.json(error);
    }
    res.json(firmas);
});


module.exports = router;


