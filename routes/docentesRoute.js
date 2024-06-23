const express = require('express');
const router = express.Router();
const  Condicion  = require('../models/Condicion');
const  Docente  = require('../models');
const DocenteGrados = require('../models/DocenteGrados');
const DocenteLaboral = require('../models/DocenteLaboral');
const DocenteCurso = require('../models/DocenteCurso');
const DocenteCategoria = require('../models/DocenteCategoria');
const DocenteInvestigador = require('../models/DocenteInvestigador');
const Departamento = require('../models/Departamento');
const Provincia = require('../models/Provincia');
const Distrito = require('../models/Distrito');


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
            { include: [DocenteGrados, DocenteLaboral, DocenteCategoria, DocenteCurso, DocenteInvestigador] }
        );

        console.log(docentes);
        // Iterar sobre los docentes para deserializar y buscar lugar_nacimiento
        for (let docente of docentes) {
            if (docente.lugar_nacimiento) {
                let lugarNacimiento = JSON.parse(docente.lugar_nacimiento);
                let departamento = await Departamento.findByPk(lugarNacimiento.departamento);
                let provincia = await Provincia.findByPk(lugarNacimiento.provincia);
                let distrito = await Distrito.findByPk(lugarNacimiento.distrito);

                // Puedes agregar estos nombres al objeto docente si lo deseas
                docente.dataValues.lugarNacimiento = {
                    departamento: departamento ? departamento.nombre : null,
                    provincia: provincia ? provincia.nombre : null,
                    distrito: distrito ? distrito.nombre : null
                };
                console.log(docente.dataValues.lugarNacimiento);
            }
        }
        console.log("*********************");
        console.log(docentes);
        console.log("*********************");
        res.json(docentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/cod/:codigo', async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const docentes = await Docente.findAll(
            { 
                include: [DocenteGrados, DocenteLaboral, DocenteCategoria, DocenteCurso, DocenteInvestigador],
                where: { codigo },
            }
        );

        console.log("****************************");
        console.log(docentes);
        console.log("****************************");
        // Iterar sobre los docentes para deserializar y buscar lugar_nacimiento
        for (let docente of docentes) {
            if (docente.lugar_nacimiento) {
                let lugarNacimiento = JSON.parse(docente.lugar_nacimiento);
                let departamento = await Departamento.findByPk(lugarNacimiento.departamento);
                let provincia = await Provincia.findByPk(lugarNacimiento.provincia);
                let distrito = await Distrito.findByPk(lugarNacimiento.distrito);

                // Puedes agregar estos nombres al objeto docente si lo deseas
                docente.dataValues.lugarNacimiento = {
                    departamento: departamento ? departamento.nombre : null,
                    provincia: provincia ? provincia.nombre : null,
                    distrito: distrito ? distrito.nombre : null
                };
                console.log(docente.dataValues.lugarNacimiento);
            }
        }
        console.log("*********************");
        console.log(docentes);
        console.log("*********************");
        res.json(docentes);
    } catch (error) {
        res.json({ length: 0 });
    }
});

router.get('/:codigodocentes', async (req, res) => {
    try {
        const codigo = req.params.codigodocentes;
        const docentes = await Docente.findAll(
            {
                include: [DocenteGrados, DocenteLaboral, DocenteCategoria, DocenteCurso, DocenteInvestigador],
                where: { codigo },
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
        const codigo = req.params.codigodocentes;
        // Actualizar el registro de departamento en la base de datos
        await Docente.update(req.body, {
            where: { codigo },
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
        const codigo = req.params.codigodocentes;
        // Eliminar el registro de departamento de la base de datos
        await Docente.destroy({
            where: { codigo },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
});

module.exports = router;
