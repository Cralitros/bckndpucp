const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } = require("docx");

async function generateDocxContrato(docenteData) {
  // Obtener datos adicionales si es necesario
  /*const departamento = await Departamento.findByPk(docenteData.idDepartamento);
  const provincia = await Provincia.findByPk(docenteData.idProvincia);
  const distrito = await Distrito.findByPk(docenteData.idDistrito);*/

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Encabezado institucional
        new Paragraph({
          text: "PONTIFICIA UNIVERSIDAD CATÓLICA DEL PERÚ",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: "DEPARTAMENTO ACADÉMICO DE DERECHO",
          heading: HeadingLevel.HEADING_2,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // Cuerpo del documento
        new Paragraph({
          children: [
            new TextRun({
              text: "EL JEFE DEL DEPARTAMENTO ACADÉMICO DE DERECHO DE LA ",
            }),
            new TextRun({
              text: "PONTIFICIA UNIVERSIDAD CATÓLICA DEL PERÚ, ",
              bold: true,
            }),
            new TextRun({
              text: "pone en su conocimiento lo siguiente:",
            }),
          ],
          alignment: AlignmentType.BOTH,
          spacing: { after: 400 },
        }),

        // Contenido principal
        new Paragraph({
          children: [
            new TextRun({ text: "El señor " }),
            new TextRun({ 
              text: `${docenteData.nombre} ${docenteData.apellido} `,
              bold: true 
            }),
            // ... resto del contenido
          ],
          alignment: AlignmentType.BOTH,
          spacing: { after: 200 },
        }),

        // Pie del documento
        new Paragraph({
          children: [
            new TextRun({ 
              text: "Lugar de nacimiento: ",
              bold: true 
            }),
            new TextRun({
              text: `${docenteData}, ${docenteData}, ${docenteData }`,
            }),
          ],
          spacing: { after: 400 },
        }),

        new Paragraph({
          text: "Se expide el presente a solicitud del interesado.",
          italics: true,
          spacing: { after: 400 },
        }),

        // Fecha y firma
        new Paragraph({
          text: `Lima, ${new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}`,
          spacing: { after: 800 },
        }),

        new Paragraph({
          text: docenteData.jefe_departamento || "Elmer Guillermo Arce Ortiz",
          bold: true,
          spacing: { after: 100 },
        }),

        new Paragraph({
          text: "Jefe del Departamento",
        }),

        new Paragraph({
          text: "Académico de Derecho",
          spacing: { after: 100 },
        }),

        new Paragraph({
          text: docenteData.iniciales || "EA/ts.",
          italics: true,
        }),
      ],
    }],
  });

  return doc;
}

module.exports = { generateDocxContrato };