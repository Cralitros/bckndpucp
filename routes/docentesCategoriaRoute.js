const express = require('express');
const router = express.Router();

const { Docente, DocenteCategoria, Condicion } = require('../models');

router.get('/report', async (req, res) => {
  
    try {
  
      let docCateg = await DocenteCategoria.findAll();
      console.log(docCateg);
  
  
      // Extrae los nombres de los campos del primer objeto y excluye 'createdAt' y 'updatedAt'
      const headers = Object.keys(docCateg[0].dataValues).filter(
        (field) => field !== 'createdAt' && field !== 'updatedAt'
      );
  
      const columnWidths = Array.from({ length: headers.length }, () => 'auto');
      console.log(headers);
  
      // Convierte los nombres de campos en un array de encabezados
      const tableBody = [
        headers // Usamos los nombres de los campos como encabezados
      ];
      docCateg.forEach(docCat => {
        tableBody.push(headers.map(header => docCat.dataValues[header]));
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
      const imagePath = path.join(__dirname, '../public/images/logo.png');; // Ruta de tu imagen
      const imageBase64 = fs.readFileSync(imagePath, 'base64');
      console.log(imagePath);
      //res.json(imagePath)
  
      const docDefinition = {
        content: [
          {
            columns: [
              {
                text: 'REPORTE DE DOCENTE CATEGORIAS',
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
          { text: 'Lista de docentes por categoria', style: 'subheader', margin: [0, 0, 0, 10] },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths:columnWidths,
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
    try {
        const docenteLaborales = await DocenteCategoria.findAll(
            { include: [Docente] }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:codigodocentes', async (req, res) => {
    try {
        const codigoDocente = req.params.codigodocentes;
        const docenteLaborales = await DocenteCategoria.findAll(
            {
                include: [Docente],
                where: { codigoDocente },
            }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Crear un nuevo condicion
router.post('/', async (req, res) => {
    try {
        const docenteLaborales = await DocenteCategoria.create(req.body);
        res.status(201).json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un condicion
router.put('/:codigodocentes', async (req, res) => {
    try {
        const codigoDocente = req.params.codigodocentes;
        console.log("*************ACTUALIZAR******");
        
        console.log(req.body);
        console.log("**********ACTUALIZAR*********");
        
        // Actualizar el registro de departamento en la base de datos
        await DocenteCategoria.update(req.body, {
            where: { codigoDocente },
        });

        res.status(201).json("Se actualizo correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar' });
    }
});

// Eliminar un condicion
router.delete('/:codigodocentes', async (req, res) => {
    try {
        const codigoDocente = req.params.codigodocentes;
        // Eliminar el registro de departamento de la base de datos
        await DocenteCategoria.destroy({
            where: { codigoDocente },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
});

module.exports = router;
