
const fs = require('fs');
const path = require('path');


const pdfMake = require('pdfmake');

// 1. Configuración inicial
const fonts = {
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    }
};

const printer = new pdfMake(fonts);

// 2. Función para generar el documento
function generateUniversityDocument(docenteData) {
    //console.log(docenteData.DocenteCategoria[0].dataValues.categoriadap);
    let enunciacion;
    if(docenteData.sexo=='Masculino'){
        enunciacion="El señor";
    }else{
        enunciacion="La señora";
    }
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [60, 80, 60, 60],
        content: [
            // Encabezado institucional
            {
                text: 'PONTIFICIA UNIVERSIDAD CATÓLICA DEL PERÚ',
                style: 'institutionHeader',
                alignment: 'center',
                margin: [0, 0, 0, 5]
            },
            {
                text: 'DEPARTAMENTO ACADÉMICO DE DERECHO',
                style: 'departmentHeader',
                alignment: 'center',
                margin: [0, 0, 0, 30]
            },
            // ... (resto del contenido igual a tu código)
            // Texto del documento
            {
                text: [
                    'EL JEFE DEL DEPARTAMENTO ACADÉMICO DE DERECHO DE LA ',
                    { text: 'PONTIFICIA UNIVERSIDAD CATÓLICA DEL PERÚ, ', bold: true },
                    'pone en su conocimiento lo siguiente:\n\n'
                ],
                style: 'mainText',
                margin: [0, 0, 0, 20]
            },
            // Cuerpo del documento
            {
                text: [
                    `${enunciacion} `,
                    { text: `${docenteData.nombres} ${docenteData.apellidos} `, bold: true },
                    `es docente ${docenteData.DocenteCategoria.length>0?docenteData.DocenteCategoria[0].dataValues.categoriadap+" ":''}en la categoría`,
                    { text: `${docenteData.DocenteCategoria.length>0?docenteData.DocenteCategoria[0].dataValues.categoria+" ":''} `, bold: true },
                    `con dedicación a `,
                    { text: `${docenteData.dedicacion} `, bold: true },
                    `del Departamento Académico de Derecho en el área `,
                    { text: `${docenteData.area}.`, bold: true },
                    '\n\n'
                ],
                style: 'bodyText'
            },
            {
                text: [
                    'Asimismo, debo mencionar que el profesor ',
                    { text: `${docenteData.apellido} `, bold: true },
                    `ingresó a la docencia universitaria como profesor contratado en el año `,
                    { text: `${docenteData.anio_ingreso}, `, bold: true },
                    `siendo ascendido a la categoría de profesor Auxiliar en el año `,
                    { text: `${docenteData.anio_ascenso_auxiliar}.`, bold: true },
                    '\n\n'
                ],
                style: 'bodyText'
            },
            {
                text: [
                    'Finalmente, el profesor ',
                    { text: `${docenteData.apellido} `, bold: true },
                    `fue designado como profesor Asociado en el mes de `,
                    { text: `${docenteData.mes_designacion} del año ${docenteData.anio_designacion}.`, bold: true },
                    '\n\n'
                ],
                style: 'bodyText'
            },
            // Pie del documento
            {
                text: 'Se expide el presente a solicitud del interesado.\n\n',
                style: 'footerText',
                margin: [0, 30, 0, 0]
            },
            {
                text: [
                    { text: 'Lima, ', bold: true },
                    { text: `${docenteData.fecha_emision}\n\n`, bold: false }
                ],
                alignment: 'left'
            },
            // Firma
            {
                columns: [
                    {
                        width: '*',
                        text: ''
                    },
                    {
                        width: 'auto',
                        stack: [
                            { text: `${docenteData.jefe_departamento}`, style: 'signatureName' },
                            { text: 'Jefe del Departamento', style: 'signatureTitle' },
                            { text: 'Académico de Derecho', style: 'signatureTitle' },
                            { text: '\n' },
                            { text: `${docenteData.iniciales}`, style: 'initials' }
                        ],
                        alignment: 'center'
                    }
                ],
                margin: [0, 30, 0, 0]
            }
        ],
        styles: {
            institutionHeader: {
                fontSize: 14,
                bold: true,
                color: '#1a237e'
            },
            departmentHeader: {
                fontSize: 12,
                bold: true,
                color: '#1a237e'
            },
            mainText: {
                fontSize: 12,
                alignment: 'justify',
                lineHeight: 1.5
            },
            bodyText: {
                fontSize: 12,
                alignment: 'justify',
                lineHeight: 1.5
            },
            footerText: {
                fontSize: 12,
                italics: true,
                alignment: 'justify'
            },
            signatureName: {
                fontSize: 12,
                bold: true,
                alignment: 'center'
            },
            signatureTitle: {
                fontSize: 12,
                alignment: 'center'
            },
            initials: {
                fontSize: 10,
                italics: true,
                alignment: 'center'
            }
        },
        defaultStyle: {
            font: 'Helvetica'
        }
    };

    return docDefinition;
}

// 3. Exportar función que genera el PDF como buffer
async function generateContratoDocente(docenteData) {
    console.log("data pds");
    
    return new Promise((resolve, reject) => {
        const docDefinition = generateUniversityDocument(docenteData);
        const pdfDoc = printer.createPdfKitDocument(docDefinition);

        const chunks = [];
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => {
            const pdfBuffer = Buffer.concat(chunks);
            resolve(pdfBuffer);
        });
        pdfDoc.on('error', (err) => reject(err));

        pdfDoc.end();
    });
}

module.exports = { generateContratoDocente };