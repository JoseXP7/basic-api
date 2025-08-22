const bcrypt = require('bcrypt')
const conexion = require('../db/mysql')

class Auth {
  static agregar({ usuario, password, rol }) {
    return new Promise(async (resolve, reject) => {
      try {
        const hash = await bcrypt.hash(password.toString(), 5)
        const sql = 'INSERT INTO auth (usuario, password, rol) VALUES (?, ?, ?)'
        conexion.query(sql, [usuario, hash, rol], (error, results) => {
          if (error) return reject(error)
          resolve(results.insertId)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  static actualizar(id, campos) {
    return new Promise(async (resolve, reject) => {
      try {
        let fields = []
        let values = []
        if (campos.usuario) {
          fields.push('usuario = ?')
          values.push(campos.usuario)
        }
        if (campos.password) {
          const hash = await bcrypt.hash(campos.password.toString(), 5)
          fields.push('password = ?')
          values.push(hash)
        }
        if (campos.rol) {
          fields.push('rol = ?')
          values.push(campos.rol)
        }
        if (fields.length === 0) return resolve(false)
        values.push(id)
        const sql = `UPDATE auth SET ${fields.join(', ')} WHERE id = ?`
        conexion.query(sql, values, (error, results) => {
          if (error) return reject(error)
          resolve(results.affectedRows)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  static login(usuario, password) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM auth WHERE usuario = ? LIMIT 1'
      conexion.query(sql, [usuario], async (error, results) => {
        if (error) return reject(error)
        if (results.length === 0) return resolve(null)
        const user = results[0]
        const match = await bcrypt.compare(password, user.password)
        resolve(match ? user : null)
      })
    })
  }
}

module.exports = Auth
