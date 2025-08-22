const Estudiante = require('../models/Estudiante')
const respuestas = require('../red/respuestas')

// Obtener todos los estudiantes
async function todos(req, res) {
  try {
    const estudiantes = await Estudiante.todos()
    respuestas.success(req, res, estudiantes, 200)
  } catch (error) {
    respuestas.error(req, res, error.message, 500)
  }
}

// Obtener un estudiante por ID
async function uno(req, res) {
  try {
    const estudiante = await Estudiante.uno(req.params.id)
    if (!estudiante) {
      return respuestas.error(req, res, 'Estudiante no encontrado', 404)
    }
    respuestas.success(req, res, estudiante)
  } catch (error) {
    respuestas.error(req, res, error.message, 500)
  }
}

// Agregar un estudiante
async function agregar(req, res) {
  try {
    const items = await Estudiante.agregar(req.body)
    respuestas.success(req, res, 'Agregado con éxito', 201)
  } catch (error) {
    respuestas.error(req, res, error.message, 500)
  }
}

// Actualizar un estudiante
async function actualizar(req, res) {
  try {
    const filasAfectadas = await Estudiante.modificar(req.params.id, req.body)
    if (filasAfectadas === 0) {
      return respuestas.error(req, res, 'Estudiante no encontrado', 404)
    }
    respuestas.success(req, res, 'Estudiante actualizado', 201)
  } catch (error) {
    respuestas.error(req, res, error.message, 500)
  }
}

async function eliminar(req, res) {
  try {
    const filasAfectadas = await Estudiante.eliminar(req.params.id)
    if (filasAfectadas === 0) {
      return respuestas.error(req, res, 'Estudiante no encontrado', 404)
    }
    respuestas.success(req, res, 'Estudiante eliminado', 200)
  } catch (error) {
    respuestas.error(req, res, error.message, 500)
  }
}

module.exports = {
  todos,
  uno,
  agregar,
  actualizar,
  eliminar,
}
