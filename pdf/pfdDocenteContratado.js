
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
function obtenerActual(data) {
    categoria = JSON.parse(data[0].categoria);
    const seleccionadoMasReciente = categoria
        .filter(c => c.seleccionada && c.fecha) // solo los seleccionados con fecha
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()) // ordenar descendente por fecha
    [0];
    if (!seleccionadoMasReciente)
        return "NECESITA DATO"
    return seleccionadoMasReciente.nombre;
}
function obtenerIniciales(nombreCompleto) {
    const palabrasIgnoradas = ['de', 'del', 'la', 'las', 'los', 'y', 'e']; // Puedes añadir más si necesitas
    return nombreCompleto
        .split(' ')
        .filter(palabra => palabra && !palabrasIgnoradas.includes(palabra.toLowerCase()))
        .map(palabra => palabra[0].toUpperCase())
        .join('');
}

function poner_data(data) {

    tiempo = data[0].dedicacion;

    switch (tiempo) {
        case 'TPA':
            return "Tiempo Parcial por Asignaturas (TPA - Por horas) ";
        case 'TPC':
            return "Tiempo Parcial Convencional (TPC - medio tiempo) ";
        case 'TC':
            return "Tiempo Completo (TC) "
        default:
            return "NECESITA DATO"
    }


}
function getRangoSemestre(data) {
    docente = data[0];

    // Lista manual de campos de historial
    const camposFechas = [
        docente.hContratado,
        docente.hAuxiliar,
        docente.hPrincipal,
        docente.hAsociado
        // agrega más si los tienes
    ];

    // Limpiar y convertir a Date
    const fechas = camposFechas
        .filter(f => f && !isNaN(Date.parse(f)))  // solo strings de fecha válidos
        .map(f => new Date(f));                   // convertir a objeto Date

    if (fechas.length === 0) {
        return { minimo: null, maximo: null };
    }

    // Calcular mínimo y máximo
    const minFecha = new Date(Math.min(...fechas.map(f => f.getTime())));
    const maxFecha = new Date(Math.max(...fechas.map(f => f.getTime())));

    function getSemestre(fecha) {
        const mes = fecha.getMonth(); // 0 = enero
        const año = fecha.getFullYear();
        const semestre = mes < 6 ? "I" : "II";
        return `${año}-${semestre}`;
    }

    return getSemestre(minFecha) + " hasta el " + getSemestre(maxFecha);
    return {
        minimo: { fecha: minFecha.toISOString(), semestre: getSemestre(minFecha) },
        maximo: { fecha: maxFecha.toISOString(), semestre: getSemestre(maxFecha) }
    };
}
function getSemestress(fecha) {
    const d = new Date(fecha);   // convertir string a Date
    const mes = d.getMonth(); // 0 = enero
    const año = d.getFullYear();
    const semestre = mes < 6 ? "I" : "II";
    return `${año}-${semestre}`;
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

function fecha_hoy_letras() {
    const fecha = new Date();

    // Array con nombres de los meses en español
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    // Obtener día, mes y año
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()]; // mes con nombre
    const anio = fecha.getFullYear();

    // Formatear la fecha en el estilo deseado
    return `Lima, ${dia} de ${mes} del ${anio}`;
}

function formatearLista(lista) {
    if (lista.length === 0) return "";
    if (lista.length === 1) return lista[0];
    if (lista.length === 2) return lista.join(" y ");
    return lista.slice(0, -1).join(", ") + " y " + lista[lista.length - 1];
}

function agruparCursosPorCodigo(cursos) {
    console.log(cursos);

    //return JSON.stringify(cursos);

    const agrupados = {};

    cursos.forEach(dc => {
        console.log(dc);

        const { codigoCurso, fecha_inicio, fecha_fin, Curso } = dc;

        if (!agrupados[codigoCurso]) {
            agrupados[codigoCurso] = {
                codigoCurso,
                curso: Curso, // info del curso
                fechas: []    // aquí irán las fechas
            };
        }

        agrupados[codigoCurso].fechas.push({
            inicio: fecha_inicio,
            fin: fecha_fin
        });
    });

    return Object.values(agrupados).map(curso => {
        const nombreCurso = curso.curso?.dataValues?.nombre || "NombreDesconocido";
        const codigo = curso.codigoCurso;
        const semestres = curso.fechas.map(f => getSemestress(f.inicio));

        return `• ${nombreCurso} (${codigo}) en los semestres:  ${formatearLista(semestres)}`;
    }).join("\n");
    return JSON.stringify(agrupados, null, 2);
    // lo convertimos a array
    return Object.values(agrupados);
}

// 2. Función para generar el documento
function generateUniversityDocument(docenteData, jefeDocente, asistente) {
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
            // CABECERA CON IMAGEN Y TEXTO
        {
            columns: [
                {
                    stack: [
                        { text: 'DEPARTAMENTO', bold: true, fontSize: 12, color: '#1a237e' },
                        { text: 'ACADÉMICO DE', bold: true, fontSize: 12, color: '#1a237e' },
                        { text: 'DERECHO', bold: true, fontSize: 12, color: '#1a237e' }
                    ],
                    alignment: 'left',
                    margin: [0, 0, 0, 20]
                },
                {
                    image: 'public/images/logo.png', // referencia a la imagen (debes definirla en images)
                    width: 80,
                    alignment: 'right'
                }
            ]
        },

        // ESPACIADO DESPUÉS DE LA CABECERA
        { text: '\n', margin: [0, 20, 0, 20] },
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
                    `se desempeña como profesor`,
                    { text: `${obtenerActual(docenteData.DocenteCategoria)} `, bold: true },
                    `con dedicacion a `,
                    { text: `${poner_data(docenteData.DocenteCategoria)} `, bold: true },
                    `del `,
                    { text: `Departamento Académico de Derecho,`, bold: true },
                    `desde el semestre `,
                    { text: `${getRangoSemestre(docenteData.DocenteCategoria)}`, bold: true },

                    '\n\n'
                ],
                style: 'bodyText'
            },
            {
                text: [
                    'Durante esas fechas, el profesor ',
                    { text: `${docenteData.apellidos} `, bold: true },
                    'tuvo a su cargo  el dictado de las siguiente asignaturas:',
                    '\n\n'
                ],
                style: 'bodyText'
            },
            {
                text: [
                    { text: `ASIGNATURAS`, bold: true, decoration: 'underline' },
                    '\n\n'
                ],
                style: 'bodyText'
            },
            {
                text: [
                    { text: `${agruparCursosPorCodigo(docenteData.DocenteCursos)}`, bold: true },
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
                    
                    { text: `${fecha_hoy_letras()}\n\n`, bold: false }
                ],
                alignment: 'right'
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
                            { text: `Miguel David Lovatón Palacios`, style: 'signatureName' },
                            { text: 'Jefe del Departamento', style: 'signatureTitle' },
                            { text: 'Académico de Derecho', style: 'signatureTitle' },
                            { text: '\n' },
                            { text: `${obtenerIniciales('Miguel David Lovatón Palacios')}/${obtenerIniciales(asistente.nombres + " " + asistente.apellidos)}`, style: 'initials' }
                        ],
                        alignment: 'left'
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
async function generateContratoDocente(docenteData, jefeDocente, asistente) {
    console.log("data pds");

    return new Promise((resolve, reject) => {
        const docDefinition = generateUniversityDocument(docenteData, jefeDocente, asistente);
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