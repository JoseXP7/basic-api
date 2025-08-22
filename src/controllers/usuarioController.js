const Usuario = require('../models/Usuario')
const Auth = require('../models/Auth')
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
  const usuario = {
    nombre: req.body.nombre,
    activo: req.body.activo,
  }
  try {
    const respuesta = await Usuario.agregar(usuario)

    let respuesta2 = ''

    if (req.body.usuario || req.body.password || req.body.rol) {
      respuesta2 = await Auth.agregar({
        usuario: req.body.usuario,
        password: req.body.password,
        rol: req.body.rol,
      })
    }
    respuestas.success(req, res, 'Agregado con éxito', 201)
  } catch (error) {
    next(error)
  }
}

async function actualizar(req, res, next) {
  const usuario = {
    nombre: req.body.nombre,
    activo: req.body.activo,
  }
  try {
    const filasAfectadas = await Usuario.actualizar(req.params.id, usuario)

    let respuesta2 = ''

    // Permite que si vienen estos campos en el body de la peticion, se ejecuten.
    if (req.body.usuario || req.body.password || req.body.rol) {
      respuesta2 = await Auth.actualizar(req.params.id, {
        usuario: req.body.usuario,
        password: req.body.password,
        rol: req.body.rol,
      })
    }

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
