// routes/departamentos.js
const express = require('express');
const pdfMake = require('pdfmake');

const { Departamento, Provincia, Distrito } = require('../models');
const router = express.Router();

router.get('/report', async (req, res) => {
  const fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-Italic.ttf'
    }
  };

  const printer = new pdfMake(fonts);
  const docDefinition = {
    content: [
      { text: 'Reporte generado', style: 'header' },
      'Este es un reporte generado usando PDFMake con Node.js.'
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      }
    }
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  let chunks = [];
  pdfDoc.on('data', chunk => {
    chunks.push(chunk);
  });

  pdfDoc.on('end', () => {
    const result = Buffer.concat(chunks);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(result);
  });

  pdfDoc.end();
});


router.get('/', async (req, res) => {
  let departamentos;
  try {
    departamentos = await Departamento.findAll(
      {
        include: [{
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
