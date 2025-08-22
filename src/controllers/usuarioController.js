const Usuario = require('../models/Usuario')
const respuestas = require('../red/respuestas')

async function todos(req, res, next) {
  try {
    const usuarios = await Usuario.todos()
    respuestas.success(req, res, usuarios, 200)
  } catch (error) {
    next(error)
  }
}

async function uno(req, res, next) {
  try {
    const usuario = await Usuario.uno(req.params.id)
    if (!usuario) {
      return respuestas.error(req, res, 'Usuario no encontrado', 404)
    }
    respuestas.success(req, res, usuario, 200)
  } catch (error) {
    next(error)
  }
}

async function agregar(req, res, next) {
  try {
    const items = await Usuario.agregar(req.body)
    respuestas.success(req, res, 'Agregado con éxito', 201)
  } catch (error) {
    next(error)
  }
}

async function actualizar(req, res, next) {
  try {
    const filasAfectadas = await Usuario.actualizar(req.params.id, req.body)
    if (filasAfectadas === 0) {
      return respuestas.error(req, res, 'Usuario no encontrado', 404)
    }
    respuestas.success(req, res, 'Usuario actualizado', 200)
  } catch (error) {
    next(error)
  }
}

async function eliminar(req, res, next) {
  try {
    const filasAfectadas = await Usuario.eliminar(req.params.id)
    if (filasAfectadas === 0) {
      return respuestas.error(req, res, 'Usuario no encontrado', 404)
    }
    respuestas.success(req, res, 'Usuario eliminado', 200)
  } catch (error) {
    next(error)
  }
}

module.exports = { todos, uno, agregar, actualizar, eliminar }
