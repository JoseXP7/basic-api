const conexion = require('../db/mysql')

class Usuario {
  static todos() {
    return new Promise((resolve, reject) => {
      conexion.query('SELECT * FROM usuarios', (error, results) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

  static uno(id) {
    return new Promise((resolve, reject) => {
      conexion.query(
        'SELECT * FROM usuarios WHERE id = ?',
        [id],
        (error, results) => {
          if (error) return reject(error)
          resolve(results[0])
        }
      )
    })
  }

  static agregar(usuario) {
    return new Promise((resolve, reject) => {
      conexion.query(
        'INSERT INTO usuarios SET ?',
        usuario,
        (error, results) => {
          if (error) return reject(error)
          resolve(results.insertId)
        }
      )
    })
  }

  static actualizar(id, usuario) {
    return new Promise((resolve, reject) => {
      conexion.query(
        'UPDATE usuarios SET ? WHERE id = ?',
        [usuario, id],
        (error, results) => {
          if (error) return reject(error)
          resolve(results.affectedRows)
        }
      )
    })
  }

  static eliminar(id) {
    return new Promise((resolve, reject) => {
      conexion.query(
        'DELETE FROM usuarios WHERE id = ?',
        [id],
        (error, results) => {
          if (error) return reject(error)
          resolve(results.affectedRows)
        }
      )
    })
  }
}

module.exports = Usuario
