// routes/curso.js
const express = require('express');
const {Curso} = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  let curso;
  try {
    curso = await Curso.findAll();
  } catch (error) {
    res.json(error);
  }
  res.json(curso);
});

router.get('/:codigo', async (req, res) => {
  let curso;
  try {
    curso = await Curso.findAll({
      where: { codigo: req.params.codigo }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(curso);
});



router.post('/', async (req, res) => {
  let departamento;
  try {
    console.log(req.params);
    departamento = await Curso.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
});

router.put('/:codigo', async (req, res) => {
  let departamento;
  try {
    console.log(req.body);
    departamento = await Curso.update(req.body, {
      where: { codigo: req.params.codigo }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
});

router.delete('/:codigo', async (req, res) => {
  let result;
  try {
    result = await Curso.destroy({
      where: { codigo: req.params.codigo }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
});

module.exports = router;
