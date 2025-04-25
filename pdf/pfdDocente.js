
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

function obtenerIniciales(nombreCompleto) {
    const palabrasIgnoradas = ['de', 'del', 'la', 'las', 'los', 'y', 'e']; // Puedes añadir más si necesitas
    return nombreCompleto
        .split(' ')
        .filter(palabra => palabra && !palabrasIgnoradas.includes(palabra.toLowerCase()))
        .map(palabra => palabra[0].toUpperCase())
        .join('');
}

function poner_data(data) {
    console.log(data);

    if (data.length == 0) {
        return "profesional "
    } else {
        switch (data[0].dataValues.dedicacion) {
            case 'TPA':
                return "Tiempo Parcial por Asignaturas (TPA - Por horas) ";
            case 'TPC':
                return "Tiempo Parcial Convencional (TPC - medio tiempo) ";
            case 'TC':
                return "Tiempo Completo (TC) "
            default:
                break;
        }
    }

}

function verificar(data) {
    console.log("verificar");

    console.log(data);
    const fecha = new Date(data);

    // Obtener día, mes y año
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const anio = fecha.getFullYear();

    // Formatear
    let fechaFormateada = String(`${dia}/${mes}/${anio}`.toString());

    console.log(fechaFormateada);

    return fechaFormateada;

}
function fecha_hoy() {
    const fecha = new Date();

    // Obtener día, mes y año
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const anio = fecha.getFullYear();
    let fechaFormateada = String(`${dia}/${mes}/${anio}`.toString());
    return fechaFormateada;
}
// 2. Función para generar el documento
function generateUniversityDocument(docenteData, jefeDocente,asistente) {
    //console.log(docenteData.DocenteCategoria[0].dataValues.categoriadap);
    let enunciacion;
    if (docenteData.sexo == 'Masculino') {
        enunciacion = "El señor";
    } else {
        enunciacion = "La señora";
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
                    `es docente ${docenteData.DocenteCategoria.length > 0 ? docenteData.DocenteCategoria[0].dataValues.categoriadap + " " : ''}en la categoría `,
                    { text: `${docenteData.DocenteCategoria.length > 0 ? docenteData.DocenteCategoria[0].dataValues.categoria + " " : ''} `, bold: true },
                    `con dedicación a `,
                    { text: `${poner_data(docenteData.DocenteCategoria)}`, bold: true },
                    `del Departamento Académico de Derecho en el área Procesal`,
                    '\n\n'
                ],
                style: 'bodyText'
            },
            {
                text: [
                    'Asimismo, debo mencionar que el profesor ',
                    { text: `${docenteData.apellidos} `, bold: true },
                    `ingresó a la docencia universitaria como profesor contratado en el año `,
                    { text: `${verificar(docenteData.DocenteCategoria[0].dataValues.fecha)}`, bold: true },
                    /*   `siendo ascendido a la categoría de profesor Auxiliar en el año `,
                       { text: `${docenteData.anio_ascenso_auxiliar}.`, bold: true },*/
                    '\n\n'
                ],
                style: 'bodyText'
            },
            /* {
                 text: [
                     'Finalmente, el profesor ',
                     { text: `${docenteData.apellido} `, bold: true },
                     `fue designado como profesor Asociado en el mes de `,
                     { text: `${docenteData.mes_designacion} del año ${docenteData.anio_designacion}.`, bold: true },
                     '\n\n'
                 ],
                 style: 'bodyText'
             },*/
            // Pie del documento
            {
                text: 'Se expide el presente a solicitud del interesado.\n\n',
                style: 'footerText',
                margin: [0, 30, 0, 0]
            },
            {
                text: [
                    { text: 'Lima, ', bold: true },
                    { text: `${fecha_hoy()}\n\n`, bold: false }
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
                            { text: `${jefeDocente.nombres} ${jefeDocente.apellidos}`, style: 'signatureName' },
                            { text: 'Jefe del Departamento', style: 'signatureTitle' },
                            { text: 'Académico de Derecho', style: 'signatureTitle' },
                            { text: '\n' },
                            { text: `${obtenerIniciales(jefeDocente.nombres+" "+jefeDocente.apellidos)}/${obtenerIniciales(asistente.nombres+" "+ asistente.apellidos)}`, style: 'initials' }
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
async function generateContratoDocente(docenteData, jefeDocente,asistente) {
    console.log("data pds");

    return new Promise((resolve, reject) => {
        const docDefinition = generateUniversityDocument(docenteData, jefeDocente,asistente);
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