// routes/ciudades.js
const express = require('express');

const { Departamento, Provincia, Distrito } = require('../models');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const pdfMake = require('pdfmake');
router.get('/report', async (req, res) => {
  try {

    let provincias = await Provincia.findAll({
      include:[Departamento, Distrito]
    });
    console.log(provincias);

    const tableBody = [
      ['ID', 'Departamento','Provincia', 'Ubigeo'] // Encabezados de la tabla
    ];
    // Añadir los departamentos como filas
    provincias.forEach(provincia => {
      tableBody.push([provincia.id.toString(),provincia.Departamento.nombre, provincia.nombre, provincia.Departamento.valor+provincia.valor]);
    });

    console.log(tableBody);
    
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
    console.log(imagePath);
    

    const docDefinition = {
      content: [
        { 
          columns: [
            { 
              text: 'REPORTE DE PROVINCIAS', 
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
        { text: 'Lista de provincias', style: 'subheader', margin: [0, 0, 0, 10] },
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

 // console.log(departamento_id);
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
