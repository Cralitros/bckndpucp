// routes/departamentos.js
const express = require('express');

const { Facultad, Escuela,Programas } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  let facultades;
  try {
    facultades = await Programas.findAll(
      {
        include:[{
          model: Escuela,
          include: {
            model: Facultad,
          }
        }]
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
    facultades = await Programas.findAll(
      {
        include:[{
          model: Escuela,
          include: {
            model: Facultad,
          }
        }],
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
    facultades = await Programas.findAll(
      {
        include:[{
          model: Escuela,
          include: {
            model: Facultad,
          }
        }],
        where: { idEscuela: req.params.id }
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
    facultades = await Programas.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

router.put('/:id', async (req, res) => {
  let facultades;
  try {
    console.log(req.body);
    facultades = await Programas.update(req.body, {
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
    facultades = await Programas.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

module.exports = router;
