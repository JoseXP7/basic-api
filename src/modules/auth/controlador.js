const TABLA = 'auth'
const bcrypt = require('bcrypt')
const error = require('../../middleware/errors')
const authentication = require('../../authentication')

module.exports = function (dbInyectada) {
  let db = dbInyectada

  if (!db) {
    db = require('../../db/mysql')
  }

  async function actualizar(body) {
    const authData = {
      id: body.id,
      usuario: body.usuario,
      password: body.password,
      rol: body.rol,
    }

    if (body.usuario) {
      authData.usuario = body.usuario
    }

    if (body.password) {
      authData.password = await bcrypt.hash(body.password.toString(), 5)
    }

    if (body.rol) {
      authData.rol = body.rol
    }

    return db.actualizar(TABLA, authData)
  }

  async function login(usuario, password) {
    const data = await db.query(TABLA, { usuario: usuario })

    return bcrypt.compare(password, data.password).then((result) => {
      if (result === true) {
        //Generar un token si es true
        return {
          token: authentication.asignarToken({ ...data }),
          userId: data.id,
		  usuario: data.usuario,
          rol: data.rol,
        }
      } else {
        //Generar un error si es false
        throw new error('Información Inválida', 401)
      }
    })
  }

  async function agregar(data) {
    const authData = {
      usuario: data.usuario,
      password: data.password,
      rol: data.rol,
    }

    if (data.usuario) {
      authData.usuario = data.usuario
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password.toString(), 5)
    }

    if (data.rol) {
      authData.rol = data.rol
    }

    return db.agregar(TABLA, authData)
  }

  return {
    actualizar,
    agregar,
    login,
  }
}
