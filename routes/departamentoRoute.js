// routes/departamentos.js
const express = require('express');
const Departamento = require('../models');
const Provincia = require('../models/Provincia');
const Distrito = require('../models/Distrito');
const router = express.Router();

router.get('/', async (req, res) => {
  let departamentos;
  try {
    departamentos = await Departamento.findAll(
      {
        include:[{
          model: Provincia,
          include: {
            model: Distrito,
          }
        }]
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(departamentos);
});



router.post('/', async (req, res) => {
  let departamento;
  try {
    console.log(req.params);
    departamento = await Departamento.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
});

router.put('/:id', async (req, res) => {
  let departamento;
  try {
    console.log(req.body);
    departamento = await Departamento.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
});

router.delete('/:id', async (req, res) => {
  let result;
  try {
    result = await Departamento.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
});

module.exports = router;
