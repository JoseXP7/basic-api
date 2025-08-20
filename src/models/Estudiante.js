const conexion = require('../db/mysql')

class Estudiante {
  static todos() {
    const sql = 'SELECT * FROM estudiantes'
    return new Promise((resolve, reject) => {
      conexion.query(sql, (error, results) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

  // Ejemplo de método para obtener uno por id
  static uno(id) {
    const sql = 'SELECT * FROM estudiantes WHERE id = ?'
    return new Promise((resolve, reject) => {
      conexion.query(sql, [id], (error, results) => {
        if (error) return reject(error)
        resolve(results[0])
      })
    })
  }

  static agregar(estudiante) {
    const sql = 'INSERT INTO estudiantes SET ?'
    return new Promise((resolve, reject) => {
      conexion.query(sql, estudiante, (error, results) => {
        if (error) return reject(error)
        resolve(results.insertId)
      })
    })
  }

  static modificar(id, estudiante) {
    const sql = 'UPDATE estudiantes SET ? WHERE id = ?'
    return new Promise((resolve, reject) => {
      conexion.query(sql, [estudiante, id], (error, results) => {
        if (error) return reject(error)
        resolve(results.affectedRows)
      })
    })
  }

  static eliminar(id) {
    const sql = 'DELETE FROM estudiantes WHERE id = ?'
    return new Promise((resolve, reject) => {
      conexion.query(sql, [id], (error, results) => {
        if (error) return reject(error)
        resolve(results.affectedRows)
      })
    })
  }
}

module.exports = Estudiante
