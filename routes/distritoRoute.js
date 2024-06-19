// routes/distritos.js
const express = require('express');
const Distrito = require('../models/Distrito');
const Departamento = require('../models/Departamento');
const Provincia = require('../models/Provincia');
const router = express.Router();

router.get('/', async (req, res) => {
  let distritos;
  try {
    distritos = await Distrito.findAll({
      include:[{
        model: Provincia,
        include: {
          model: Departamento,
        }
      }]
    });
  } catch (error) {
    res.json(error);
  }
  res.json(distritos);
});


router.get('/:provincia_id', async (req, res) => {
  const { provincia_id } = req.params;
  let distritos;

  try {
    distritos = await Distrito.findAll({
      include:[{
        model: Provincia,
        include: {
          model: Departamento,
        }
      }],
      where: {
        provincia_id: provincia_id
      }
    });
    console.log(distritos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(distritos);
});

router.post('/', async (req, res) => {
  let distrito;
  try {
    distrito = await Distrito.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(distrito);
});

router.put('/:id', async (req, res) => {
  let distrito;
  try {
    distrito = await Distrito.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(distrito);
});

router.delete('/:id', async (req, res) => {
  let result;
  try {
    result = await Distrito.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
});

module.exports = router;
