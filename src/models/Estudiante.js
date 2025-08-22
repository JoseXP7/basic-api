const conexion = require('../db/mysql')

class Estudiante {
  static todos() {
    const sql = 'SELECT * FROM estudiante'
    return new Promise((resolve, reject) => {
      conexion.query(sql, (error, results) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

  // Ejemplo de método para obtener uno por id
  static uno(id) {
    const sql = 'SELECT * FROM estudiante WHERE id = ?'
    return new Promise((resolve, reject) => {
      conexion.query(sql, [id], (error, results) => {
        if (error) return reject(error)
        resolve(results[0])
      })
    })
  }

  static agregar(estudiante) {
    const sql = 'INSERT INTO estudiante SET ?'
    return new Promise((resolve, reject) => {
      conexion.query(sql, estudiante, (error, results) => {
        if (error) return reject(error)
        resolve(results.insertId)
      })
    })
  }

  static modificar(id, estudiante) {
    const sql = 'UPDATE estudiante SET ? WHERE id = ?'
    return new Promise((resolve, reject) => {
      conexion.query(sql, [estudiante, id], (error, results) => {
        if (error) return reject(error)
        resolve(results.affectedRows)
      })
    })
  }

  static eliminar(id) {
    const sql = 'DELETE FROM estudiante WHERE id = ?'
    return new Promise((resolve, reject) => {
      conexion.query(sql, [id], (error, results) => {
        if (error) return reject(error)
        resolve(results.affectedRows)
      })
    })
  }
}

module.exports = Estudiante
