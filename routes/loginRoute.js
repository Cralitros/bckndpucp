const express = require('express');
const router = express.Router();
const { Login } = require('../models');
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
        const condiciones = await Login.findAll();
        res.json(condiciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const condiciones = await Login.findAll(
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
router.post('/register', async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Login.create({ usuario, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const user = await Login.findOne({ where: { usuario } });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un condicion
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // Actualizar el registro de departamento en la base de datos
        await Login.update(req.body, {
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
        await Login.destroy({
            where: { id },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
});

module.exports = router;


