const jwt = require('jsonwebtoken')
const config = require('../config')
const Auth = require('../models/Auth')

async function login(req, res, next) {
  try {
    const { usuario, password } = req.body
    const user = await Auth.login(usuario, password)
    if (!user) return res.status(401).json({ mensaje: 'Información inválida' })

    const payload = { id: user.id, usuario: user.usuario, rol: user.rol }
    const token = jwt.sign(payload, config.jwt.secret, { expiresIn: '1h' })
    res.json({ token, userId: user.id, usuario: user.usuario, rol: user.rol })
  } catch (error) {
    next(error)
  }
}

async function agregar(req, res, next) {
  try {
    const id = await Auth.agregar(req.body)
    res.status(201).json({ id })
  } catch (error) {
    next(error)
  }
}

async function actualizar(req, res, next) {
  try {
    await Auth.actualizar({ ...req.body, id: req.params.id })
    res.json({ mensaje: 'Usuario actualizado' })
  } catch (error) {
    next(error)
  }
}

module.exports = { login, agregar, actualizar }
