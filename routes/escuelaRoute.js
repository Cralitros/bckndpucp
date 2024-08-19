// routes/departamentos.js
const express = require('express');

const { Facultad, Escuela, Programas } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  let facultades;
  try {
    facultades = await Escuela.findAll(
      {
        include:[Facultad, Programas]
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});
router.get('/:id', async (req, res) => {
  let facultades;
  try {
    facultades = await Escuela.findAll(
      {
        include:[Facultad, Programas],
        where: { id: req.params.id }
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

router.get('/lista/:id', async (req, res) => {
  let facultades;
  try {
    facultades = await Escuela.findAll(
      {
        include:[Facultad, Programas],
        where: { idFacultad: req.params.id }
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});


router.post('/', async (req, res) => {
  let facultades;
  try {
    console.log(req.params);
    facultades = await Escuela.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

router.put('/:id', async (req, res) => {
  let facultades;
  try {
    console.log(req.body);
    facultades = await Escuela.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

router.delete('/:id', async (req, res) => {
  let facultades;
  try {
    facultades = await Escuela.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

module.exports = router;
