// routes/distritos.js
const express = require('express');

const { Departamento, Provincia, Distrito } = require('../models');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const pdfMake = require('pdfmake');
router.get('/report', async (req, res) => {
  try {

    distritos = await Distrito.findAll({
      include:[{
        model: Provincia,
        include: {
          model: Departamento,
        }
      }]
    });
   // console.log(distritos);

    const tableBody = [
      ['ID', 'Provincia','Distrito', 'Ubigeo'] // Encabezados de la tabla
    ];
    // Añadir los departamentos como filas
    distritos.forEach(distrito => {
      tableBody.push([distrito.id.toString(),distrito.Provincium.nombre, distrito.nombre,  distrito.Provincium.Departamento.valor+distrito.Provincium.valor+distrito.valor]);
    });

   // console.log(tableBody);
    
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-Italic.ttf'
      }
    };

    const printer = new pdfMake(fonts);
    const imagePath = './routes/images/logo.png'; // Ruta de tu imagen
    const imageBase64 = fs.readFileSync(imagePath, 'base64');
 //   console.log(imagePath);
    

    const docDefinition = {
      content: [
        { 
          columns: [
            { 
              text: 'REPORTE DE DISTRITOS', 
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
        { text: 'Lista de DISTRITOS', style: 'subheader', margin: [0, 0, 0, 10] },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            //widths: ['auto', 'auto','*'],
            widths: ['auto', 'auto', 'auto','auto'],
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

router.get('/total', async (req, res) => {
  try {
    const total = await Distrito.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});

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
