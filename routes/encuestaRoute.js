// routes/departamentos.js
const express = require('express');
const Encuesta = require('../models/Encuesta');
const router = express.Router();

router.get('/', async (req, res) => {
  let departamentos;
  try {
    departamentos = await Encuesta.findAll();
  } catch (error) {
    res.json(error);
  }
  res.json(departamentos);
});
router.get('/:id', async (req, res) => {
  let departamentos;
  try {
    departamentos = await Encuesta.findAll({
      where: { codigo: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(departamentos);
});



router.post('/', async (req, res) => {
  let departamento;
  try {
    console.log(req.params);
    departamento = await Encuesta.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
});

router.put('/:id', async (req, res) => {
  let departamento;
  try {
    console.log(req.body);
    departamento = await Encuesta.update(req.body, {
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
    result = await Encuesta.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
});

module.exports = router;
