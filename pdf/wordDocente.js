const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } = require("docx");

// Funciones auxiliares (las mismas que usas en PDF)
function obtenerActual(data) {
    categoria = JSON.parse(data[0].categoria);
    const seleccionadoMasReciente = categoria
        .filter(c => c.seleccionada && c.fecha)
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];
    
    if (!seleccionadoMasReciente) return "NECESITA DATO";
    return seleccionadoMasReciente.nombre;
}

function obtenerIniciales(nombreCompleto) {
    const palabrasIgnoradas = ['de', 'del', 'la', 'las', 'los', 'y', 'e'];
    return nombreCompleto
        .split(' ')
        .filter(palabra => palabra && !palabrasIgnoradas.includes(palabra.toLowerCase()))
        .map(palabra => palabra[0].toUpperCase())
        .join('');
}

function poner_data(data) {
    tiempo = data[0].dedicacion;

    switch (tiempo) {
        case 'TPA': return "Tiempo Parcial por Asignaturas (TPA - Por horas) ";
        case 'TPC': return "Tiempo Parcial Convencional (TPC - medio tiempo) ";
        case 'TC': return "Tiempo Completo (TC) ";
        default: return "NECESITA DATO";
    }
}

function getRangoSemestre(data) {
    docente = data[0];
    const camposFechas = [
        docente.hContratado,
        docente.hAuxiliar,
        docente.hPrincipal,
        docente.hAsociado
    ];

    const fechas = camposFechas
        .filter(f => f && !isNaN(Date.parse(f)))
        .map(f => new Date(f));

    if (fechas.length === 0) {
        return { minimo: null, maximo: null };
    }

    const minFecha = new Date(Math.min(...fechas.map(f => f.getTime())));
    const maxFecha = new Date(Math.max(...fechas.map(f => f.getTime())));

    function getSemestre(fecha) {
        const mes = fecha.getMonth();
        const año = fecha.getFullYear();
        const semestre = mes < 6 ? "I" : "II";
        return `${año}-${semestre}`;
    }

    return getSemestre(minFecha) + " hasta el " + getSemestre(maxFecha);
}

function fecha_hoy() {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

function agruparCursosPorCodigo(cursos) {
    const agrupados = {};

    cursos.forEach(dc => {
        const { codigoCurso, fecha_inicio, fecha_fin, Curso } = dc;

        if (!agrupados[codigoCurso]) {
            agrupados[codigoCurso] = {
                codigoCurso,
                curso: Curso,
                fechas: []
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
        return `• ${nombreCurso} (${codigo}) en los semestres: `;
    }).join("\n");
}

// Función principal para generar el documento Word
async function generateDocxContrato(docenteData, jefeDocente, asistente) {
    let enunciacion;
    if (docenteData.sexo == 'Masculino') {
        enunciacion = "El señor";
    } else {
        enunciacion = "La señora";
    }

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

                // Introducción
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
                            text: "pone en su conocimiento lo siguiente:\n\n",
                        }),
                    ],
                    alignment: AlignmentType.BOTH,
                    spacing: { after: 400 },
                }),

                // Cuerpo principal
                new Paragraph({
                    children: [
                        new TextRun({ text: `${enunciacion} ` }),
                        new TextRun({ 
                            text: `${docenteData.nombres} ${docenteData.apellidos} `,
                            bold: true 
                        }),
                        new TextRun({ text: "se desempeña como profesor " }),
                        new TextRun({ 
                            text: `${obtenerActual(docenteData.DocenteCategoria)} `,
                            bold: true 
                        }),
                        new TextRun({ text: "con dedicación a " }),
                        new TextRun({ 
                            text: `${poner_data(docenteData.DocenteCategoria)} `,
                            bold: true 
                        }),
                        new TextRun({ text: "del " }),
                        new TextRun({ 
                            text: "Departamento Académico de Derecho, ",
                            bold: true 
                        }),
                        new TextRun({ text: "desde el semestre " }),
                        new TextRun({ 
                            text: `${getRangoSemestre(docenteData.DocenteCategoria)}`,
                            bold: true 
                        }),
                        new TextRun({ text: ".\n\n" }),
                    ],
                    alignment: AlignmentType.BOTH,
                    spacing: { after: 400 },
                }),

                new Paragraph({
                    children: [
                        new TextRun({ text: "Durante esas fechas, el profesor " }),
                        new TextRun({ 
                            text: `${docenteData.apellidos} `,
                            bold: true 
                        }),
                        new TextRun({ text: "tuvo a su cargo el dictado de los siguientes cursos:\n\n" }),
                    ],
                    alignment: AlignmentType.BOTH,
                    spacing: { after: 200 },
                }),

                // Cursos
                new Paragraph({
                    children: [
                        new TextRun({ 
                            text: "CURSOS",
                            bold: true,
                            underline: {} 
                        }),
                    ],
                    spacing: { after: 200 },
                }),

                new Paragraph({
                    text: agruparCursosPorCodigo(docenteData.DocenteCursos),
                    spacing: { after: 400 },
                }),

                // Información adicional
                new Paragraph({
                    children: [
                        new TextRun({ text: "Asimismo, debo mencionar que el profesor " }),
                        new TextRun({ 
                            text: `${docenteData.apellidos} `,
                            bold: true 
                        }),
                        new TextRun({ text: "ingresó a la docencia universitaria como profesor contratado en el año " }),
                        // Aquí puedes agregar más datos específicos si los tienes
                        new TextRun({ text: ".\n\n" }),
                    ],
                    alignment: AlignmentType.BOTH,
                    spacing: { after: 400 },
                }),

                // Pie del documento
                new Paragraph({
                    text: "Se expide el presente a solicitud del interesado.",
                    italics: true,
                    spacing: { after: 400 },
                }),

                // Fecha
                new Paragraph({
                    children: [
                        new TextRun({ 
                            text: "Lima, ",
                            bold: true 
                        }),
                        new TextRun({
                            text: `${fecha_hoy()}`,
                        }),
                    ],
                    spacing: { after: 800 },
                }),

                // Firma
                new Paragraph({
                    text: `${jefeDocente.nombres} ${jefeDocente.apellidos}`,
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
                    text: `${obtenerIniciales(jefeDocente.nombres + " " + jefeDocente.apellidos)}/${obtenerIniciales(asistente.nombres + " " + asistente.apellidos)}`,
                    italics: true,
                }),
            ],
        }],
    });

    return doc;
}

module.exports = { generateDocxContrato };