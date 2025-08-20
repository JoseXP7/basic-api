const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('./errors')

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    throw new error('Token requerido', 401)
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    throw new error('Token malformado', 401)
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      throw new error('Token inválido', 401)
    }
    req.usuario = decoded
    next()
  })
}

module.exports = verificarToken
