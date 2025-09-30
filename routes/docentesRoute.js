const express = require('express');
const router = express.Router();
const { Docente, DocenteGrados, DocenteLaboral, DocenteCurso,
  DocenteCategoria, DocenteInvestigador, Departamento, Provincia, Distrito,
  Login,
  Nacionalidad,
  Curso } = require('../models');

const fs = require('fs');
const path = require('path');
const pdfMake = require('pdfmake');


let departamento;
let provincia;
let distrito;

const pdfGenerator = require('../pdf/pfdDocente'); // Importar el módulo

const { generateDocxContrato } = require('../pdf/wordDocente');
const { Packer } = require('docx');

//generar word
router.get('/contratow/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;

    const docente = await Docente.findOne({
      where: { codigo },
      include: [
        DocenteGrados,
        DocenteLaboral,
        DocenteCategoria,
        DocenteCurso, 

        {
          model:Curso
        }, // 👈 directo, sin DocenteCurso
        DocenteInvestigador,
        Departamento,
        Provincia,
        Distrito,
        Nacionalidad]
    });

    console.log('2222222222222');
    console.log(docente);

    if (!docente) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }

    const doc = await generateDocxContrato(docente.dataValues, "", "");
    const buffer = await Packer.toBuffer(doc);

    es.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=contrato_docente.docx');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');
    res.send(buffer);

  } catch (error) {
    console.error('Error al generar DOCX:', error);
    res.status(500).json({ error: error });
  }
});

//generar pdf
router.get('/contrato/:codigo/:codr', async (req, res) => {
  try {
    const jefePractica = await Login.findOne({
      where: { cargo: '1' },
    });
    console.log('**********************');

    console.log(jefePractica);

    const codr = req.params.codr;
    const asistente = await Login.findOne({
      where: { dni: codr },
    });

    console.log(asistente);


    const codigo = req.params.codigo;
    console.log("contrato");
    console.log(codigo);

    // Obtener datos del docente (ajusta según tu lógica)
    const docente = await Docente.findOne({
      where: { codigo },
      include: [
        DocenteGrados,
        DocenteLaboral,
        DocenteCategoria,
        //DocenteCurso, 
        {
          model: DocenteCurso,
          include: {
            model: Curso,
          } // 👈 aquí incluyes la relación con la tabla Curso
        },
        DocenteInvestigador,
        Departamento,
        Provincia,
        Distrito,
        Nacionalidad]
    });

    console.log('************22222');
    console.log(docente.DocenteCursos);


    if (!docente) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }

    // Generar el PDF
    const pdfBuffer = await pdfGenerator.generateContratoDocente(docente.dataValues, jefePractica.dataValues, asistente.dataValues);

    // Enviar el PDF como respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=contrato_docente.pdf');
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error al generar contrato:', error);
    res.status(500).json({ error: 'Error al generar el documento' });
  }

})

router.get('/report', async (req, res) => {

  try {

    let general = await Docente.findAll(
      {
        include: [Departamento, Provincia, Distrito]
      }

    );
    console.log(general);


    // Extrae los nombres de los campos del primer objeto y excluye 'createdAt' y 'updatedAt'
    const headers = Object.keys(general[0].dataValues).filter(
      (field) => field !== 'createdAt' && field !== 'updatedAt' && field !== 'idDepartamento'
        && field !== 'idProvincia' && field !== 'idDistrito' && field !== 'Departamento'
        && field !== 'Provincium' && field !== 'Distrito'
    );

    console.log(headers);


    const columnWidths = Array.from({ length: headers.length }, () => 'auto');
    console.log(headers);

    // Convierte los nombres de campos en un array de encabezados
    const tableBody = [
      headers // Usamos los nombres de los campos como encabezados
    ];
    general.forEach(gen => {
      tableBody.push(headers.map(header => {
        // Si el header es 'Facultad' (que es un objeto), obtenemos el nombre
        if (header === 'Escuela') {
          return gen.dataValues.Escuela.nombre; // 'nombre' es el atributo deseado del objeto Facultad
        } else if (header === 'Facultad') {
          return gen.dataValues.Escuela.Facultad.nombre; // 'nombre' es el atributo deseado del objeto Facultad
        } else if (header === 'lugar_nacimiento') {
          return gen.dataValues.Departamento.nombre + ", " + gen.dataValues.Provincium.nombre + ", " + gen.dataValues.Distrito.nombre

        }
        return gen.dataValues[header];
      }));
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
      pageSize: 'A2',
      pageOrientation: 'landscape',
      content: [
        {
          columns: [
            {
              text: 'REPORTE DE DOCENTES',
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
        { text: 'Lista de docentes', style: 'subheader', margin: [0, 0, 0, 10] },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: columnWidths,
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
    console.log("7777777777777777777777");
    const docentes = await Docente.findAll(
      { include: [DocenteGrados, DocenteLaboral, DocenteCategoria, DocenteCurso, DocenteInvestigador, Departamento, Provincia, Distrito, Nacionalidad] }
    );
    console.log("7777777777777777777777");

    console.log(docentes);
    // Iterar sobre los docentes para deserializar y buscar lugar_nacimiento
    for (let docente of docentes) {
      if (docente.lugar_nacimiento) {
        let lugarNacimiento = JSON.parse(docente.lugar_nacimiento);
        let departamento = await Departamento.findByPk(lugarNacimiento.departamento);
        let provincia = await Provincia.findByPk(lugarNacimiento.provincia);
        let distrito = await Distrito.findByPk(lugarNacimiento.distrito);

        // Puedes agregar estos nombres al objeto docente si lo deseas
        docente.dataValues.lugarNacimiento = {
          departamento: departamento ? departamento.nombre : null,
          provincia: provincia ? provincia.nombre : null,
          distrito: distrito ? distrito.nombre : null
        };
        console.log(docente.dataValues.lugarNacimiento);
      }
    }
    console.log("*********************");
    console.log(docentes);
    console.log("*********************");
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/cod/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const docentes = await Docente.findAll(
      {
        include: [DocenteGrados, DocenteLaboral, DocenteCategoria, DocenteCurso, DocenteInvestigador, Departamento, Provincia, Distrito, Nacionalidad],
        where: { codigo },
      }
    );

    console.log("****************************");
    console.log(docentes);
    console.log("****************************");
    // Iterar sobre los docentes para deserializar y buscar lugar_nacimiento
    for (let docente of docentes) {
      if (docente.lugar_nacimiento) {
        let lugarNacimiento = JSON.parse(docente.lugar_nacimiento);
        let departamento = await Departamento.findByPk(lugarNacimiento.departamento);
        let provincia = await Provincia.findByPk(lugarNacimiento.provincia);
        let distrito = await Distrito.findByPk(lugarNacimiento.distrito);

        // Puedes agregar estos nombres al objeto docente si lo deseas
        docente.dataValues.lugarNacimiento = {
          departamento: departamento ? departamento.nombre : null,
          provincia: provincia ? provincia.nombre : null,
          distrito: distrito ? distrito.nombre : null
        };
        console.log(docente.dataValues.lugarNacimiento);
      }
    }

    res.json(docentes);
  } catch (error) {
    res.json({ length: 0 });
  }
});

router.get('/:codigodocentes', async (req, res) => {
  try {
    const codigo = req.params.codigodocentes;
    const docentes = await Docente.findAll(
      {
        include: [DocenteGrados, DocenteLaboral, DocenteCategoria, DocenteCurso, DocenteInvestigador, Departamento, Provincia, Distrito, Nacionalidad],
        where: { codigo },
      }
    );
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Crear un nuevo condicion
router.post('/', async (req, res) => {
  try {
    const docentes = await Docente.create(req.body);
    res.status(201).json(docentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un condicion
router.put('/:codigodocentes', async (req, res) => {
  try {
    const codigo = req.params.codigodocentes;
    console.log("actualizado");
    console.log("actualizado");
    console.log("actualizado");
    console.log("actualizado");

    console.log(codigo);
    console.log(req.body);


    // Actualizar el registro de departamento en la base de datos
    await Docente.update(req.body, {
      where: { codigo },
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
    const codigo = req.params.codigodocentes;
    // Eliminar el registro de departamento de la base de datos
    await Docente.destroy({
      where: { codigo },
    });

    res.status(200).json({ mensaje: 'Registro eliminado' });;
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar' });
  }
});

module.exports = router;
