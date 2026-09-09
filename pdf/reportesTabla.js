// pdf/reportesTabla.js
// Helper compartido para generar los reportes PDF "tabla con logo".
// Reproduce EXACTAMENTE el mismo docDefinition/layout/styles que el código
// duplicado que había en cada ruta (routes/*Route.js -> GET /report), de modo
// que el PDF generado sea equivalente al original.
//
// Uso:
//   const { enviarReporteTabla } = require('../pdf/reportesTabla');
//   ...
//   await enviarReporteTabla(res, {
//     titulo: 'REPORTE DE X',
//     subtitulo: 'Lista de X',
//     tableBody,          // fila 0 = encabezados, resto = datos
//     columnWidths,       // opcional; por defecto 'auto' x nColumnas
//     pageSize,           // opcional (ej. 'A2'); por defecto A4
//     pageOrientation,    // opcional (ej. 'landscape'); por defecto portrait
//   });
const fs = require('fs');
const path = require('path');
const pdfMake = require('pdfmake');

const FONTS = {
  Roboto: {
    normal: path.join(__dirname, '../fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, '../fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, '../fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, '../fonts/Roboto-Italic.ttf'),
  },
};

// Logo leído una sola vez (base64) desde public/images/logo.png
const LOGO_PATH = path.join(__dirname, '../public/images/logo.png');
const LOGO_BASE64 = fs.readFileSync(LOGO_PATH, 'base64');

function enviarReporteTabla(res, { titulo, subtitulo, tableBody, columnWidths, pageSize, pageOrientation }) {
  // Mismos estilos/layout que el código original copiado en cada ruta.
  const docDefinition = {
    ...(pageSize ? { pageSize } : {}),
    ...(pageOrientation ? { pageOrientation } : {}),
    content: [
      {
        columns: [
          {
            text: titulo,
            style: 'header',
            alignment: 'left',
            margin: [0, 0, 0, 20],
          },
          {
            image: 'data:image/png;base64,' + LOGO_BASE64,
            width: 100,
            alignment: 'right',
            margin: [0, 0, 0, 20],
          },
        ],
      },
      { text: subtitulo, style: 'subheader', margin: [0, 0, 0, 10] },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths:
            columnWidths ||
            Array.from({ length: tableBody[0].length }, () => 'auto'),
          body: tableBody,
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex === 0 ? '#CCCCCC' : null;
          },
          hLineWidth: function (i, node) {
            return i === 0 || i === node.table.body.length ? 2 : 1;
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
          },
        },
      },
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        color: '#4A4A4A',
      },
      subheader: {
        fontSize: 14,
        color: '#4A4A4A',
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'white',
        fillColor: '#4CAF50',
        margin: [0, 5],
      },
    },
    defaultStyle: {
      font: 'Roboto',
    },
  };

  return new Promise((resolve, reject) => {
    try {
      const printer = new pdfMake(FONTS);
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      let chunks = [];
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => {
        const result = Buffer.concat(chunks);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(result);
        resolve();
      });
      pdfDoc.on('error', reject);
      pdfDoc.end();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { enviarReporteTabla, LOGO_BASE64 };
