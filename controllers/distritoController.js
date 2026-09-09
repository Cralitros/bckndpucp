// controllers/distritoController.js
// Lógica de negocio del recurso Distritos. Extraída tal cual de la ruta
// original (routes/distritoRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Departamento, Provincia, Distrito } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /distritos/report
async function reporte(req, res) {
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
    
    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE DISTRITOS',
      subtitulo: 'Lista de DISTRITOS',
      tableBody,
      columnWidths: ['auto', 'auto', 'auto','auto'],
    });
  } catch (error) {
    res.json(error);
  }
}

// GET /distritos/total
async function total(req, res) {
  try {
    const total = await Distrito.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /distritos
async function listar(req, res) {
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
}

// GET /distritos/:provincia_id
async function listarPorProvincia(req, res) {
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
}

// POST /distritos
async function crear(req, res) {
  let distrito;
  try {
    distrito = await Distrito.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(distrito);
}

// PUT /distritos/:id
async function actualizar(req, res) {
  let distrito;
  try {
    distrito = await Distrito.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(distrito);
}

// DELETE /distritos/:id
async function eliminar(req, res) {
  let result;
  try {
    result = await Distrito.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
}

module.exports = {
  reporte,
  total,
  listar,
  listarPorProvincia,
  crear,
  actualizar,
  eliminar,
};
