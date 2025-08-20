const Estudiante = require('../models/Estudiante')

// Obtener todos los estudiantes
async function todos(req, res, next) {
  try {
    const estudiantes = await Estudiante.todos()
    res.json(estudiantes)
  } catch (error) {
    next(error)
  }
}

// Obtener un estudiante por ID
async function uno(req, res, next) {
  try {
    const estudiante = await Estudiante.uno(req.params.id)
    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' })
    }
    res.json(estudiante)
  } catch (error) {
    next(error)
  }
}

// Agregar un estudiante
async function agregar(req, res, next) {
  try {
    const id = await Estudiante.agregar(req.body)
    res.status(201).json({ id })
  } catch (error) {
    next(error)
  }
}

// Actualizar un estudiante
async function actualizar(req, res, next) {
  try {
    const filasAfectadas = await Estudiante.modificar(req.params.id, req.body)
    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' })
    }
    res.json({ mensaje: 'Estudiante actualizado' })
  } catch (error) {
    next(error)
  }
}

async function eliminar(req, res, next) {
  try {
    const filasAfectadas = await Estudiante.eliminar(req.params.id)
    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' })
    }
    res.json({ mensaje: 'Estudiante eliminado' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  todos,
  uno,
  agregar,
  actualizar,
  eliminar,
}
