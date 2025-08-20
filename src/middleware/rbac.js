const error = require('./errors')

function permitirRoles(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      throw new error('No tienes permisos para realizar esta acción', 401)
    }
    next()
  }
}

module.exports = permitirRoles
