// routes/ciudades.js
const express = require('express');
const Provincia = require('../models');
const Departamento = require('../models/Departamento');
const Distrito = require('../models/Distrito');
const router = express.Router();

router.get('/', async (req, res) => {
  let provincias;
  try {
    provincias = await Provincia.findAll({
      include:[Departamento, Distrito]
    });
  } catch (error) {
    res.json(error);
  }
  //const provincias = await Provincia.findAll();
  res.json(provincias);
});

router.get('/:departamento_id', async (req, res) => {
  const { departamento_id } = req.params;
  let provincias;

  console.log(departamento_id);
  try {
    provincias = await Provincia.findAll({
      include:[Departamento, Distrito],
      where: {
        departamento_id: departamento_id
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(provincias);
});
router.get('/provin/:id', async (req, res) => {
  const { id } = req.params;
  let provincias;

  try {
    provincias = await Provincia.findAll({
      include:[Departamento, Distrito],
      where: { id: id }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(provincias);
});


router.post('/', async (req, res) => {
  let provincia;
  try {
    provincia = await Provincia.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(provincia);
});

router.put('/:id', async (req, res) => {
  let provincia;
  try {
    provincia = await Provincia.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(provincia);
});

router.delete('/:id', async (req, res) => {
  let result;
  try {
    result = await Provincia.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
});

module.exports = router;
