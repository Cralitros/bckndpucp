// routes/departamentos.js
const express = require('express');
const pdfMake = require('pdfmake');
const fs = require('fs');
const path = require('path');
const Afp = require('../models/Afp');


const router = express.Router();

router.get('/report', async (req, res) => {
  try {

    let afps = await Afp.findAll();
    console.log(afps);

   
    const tableBody = [
      ['ID', 'Nombre'] // Encabezados de la tabla
    ];
  
    // Añadir los departamentos como filas
    afps.forEach(afp => {
      tableBody.push([afp.id.toString(), afp.nombre]);
    });
    

    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-Italic.ttf'
      }
    };

    
    const printer = new pdfMake(fonts);
    const imagePath =path.join(__dirname, '../public/images/logo.png');; // Ruta de tu imagen
    const imageBase64 = fs.readFileSync(imagePath, 'base64');
    
    

    const docDefinition = {
      content: [
        { 
          columns: [
            { 
              text: 'REPORTE DE AFP', 
              style: 'header', 
              alignment: 'left', 
              margin: [0, 0, 0, 20] 
            },
            {
              image: 'data:image/png;base64,' + imageBase64, // Insertar la imagen en formato Base64
              width: 100, // Ajustar el tamaño de la imagen
              alignment: 'right', // Alinear la imagen a la derecha
              margin: [0, 0, 0, 20]
            }
          ]
        },
        { text: 'Lista de AFP', style: 'subheader', margin: [0, 0, 0, 10] },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            //widths: ['auto', 'auto','*'],
            widths: ['auto', 'auto'],
            body: tableBody
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex === 0) ? '#CCCCCC' : null;
            },
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              return '#A9A9A9';
            },
            vLineColor: function (i, node) {
              return '#A9A9A9';
            },
            paddingLeft: function (i) {
              return i === 0 ? 8 : 4;
            },
            paddingRight: function (i, node) {
              return i === node.table.body[0].length - 1 ? 8 : 4;
            }
          }
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          color: '#4A4A4A'
        },
        subheader: {
          fontSize: 14,
          color: '#4A4A4A'
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'white',
          fillColor: '#4CAF50',
          margin: [0, 5],
        }
      },
      defaultStyle: {
        font: 'Roboto',
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
  } catch (error) {
    res.json(error);
  }
});


router.get('/', async (req, res) => {
  let afps;
  try {
    afps = await Afp.findAll(  );
  } catch (error) {
    res.json(error);
  }
  res.json(afps);
});
router.get('/total', async (req, res) => {
  try {
    const total = await Afp.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});


router.post('/', async (req, res) => {
  let afps;
  try {
    console.log(req.params);
    afps = await Afp.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(afps);
});

router.put('/:id', async (req, res) => {
  let afps;
  try {
    console.log(req.body);
    afps = await Afp.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
});

router.delete('/:id', async (req, res) => {
  let afps;
  try {
    afps = await Afp.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(afps);
});

module.exports = router;
