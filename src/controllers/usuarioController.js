const Usuario = require('../models/Usuario')

async function todos(req, res, next) {
  try {
    const usuarios = await Usuario.todos()
    res.json(usuarios)
  } catch (error) {
    next(error)
  }
}

async function uno(req, res, next) {
  try {
    const usuario = await Usuario.uno(req.params.id)
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }
    res.json(usuario)
  } catch (error) {
    next(error)
  }
}

async function agregar(req, res, next) {
  try {
    const id = await Usuario.agregar(req.body)
    res.status(201).json({ id })
  } catch (error) {
    next(error)
  }
}

async function actualizar(req, res, next) {
  try {
    const filasAfectadas = await Usuario.actualizar(req.params.id, req.body)
    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }
    res.json({ mensaje: 'Usuario actualizado' })
  } catch (error) {
    next(error)
  }
}

async function eliminar(req, res, next) {
  try {
    const filasAfectadas = await Usuario.eliminar(req.params.id)
    if (filasAfectadas === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' })
    }
    res.json({ mensaje: 'Usuario eliminado' })
  } catch (error) {
    next(error)
  }
}

module.exports = { todos, uno, agregar, actualizar, eliminar }
