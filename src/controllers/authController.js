const jwt = require('jsonwebtoken')
const config = require('../config')
const Auth = require('../models/Auth')
const respuestas = require('../red/respuestas')

async function login(req, res, next) {
  try {
    const { usuario, password } = req.body
    const user = await Auth.login(usuario, password)
    if (!user) return respuestas.error(req, res, 'Información inválida', 401)

    const payload = { id: user.id, usuario: user.usuario, rol: user.rol }
    const token = jwt.sign(payload, config.jwt.secret, { expiresIn: '1h' })
    respuestas.success(
      req,
      res,
      { token, userId: user.id, usuario: user.usuario, rol: user.rol },
      200
    )
  } catch (error) {
    next(error)
  }
}

async function agregar(req, res, next) {
  try {
    const items = await Auth.agregar(req.body)
    respuestas.success(req, res, 'Agregado con éxito', 201)
  } catch (error) {
    next(error)
  }
}

async function actualizar(req, res, next) {
  try {
    await Auth.actualizar({ ...req.body, id: req.params.id })
    respuestas.success(req, res, 'Usuario actualizado', 201)
  } catch (error) {
    next(error)
  }
}

module.exports = { login, agregar, actualizar }
