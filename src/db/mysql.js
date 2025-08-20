const mysql = require('mysql')
const config = require('../config')

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

let conexion

function conMysql() {
  conexion = mysql.createConnection(dbconfig)

  conexion.connect((err) => {
    if (err) {
      console.log('[DB Error]', err)
      setTimeout(conMysql, 200)
    } else {
      console.log('DB Conectada')
    }
  })

  conexion.on('Error', (err) => {
    console.log('[DB Error]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      conMysql()
    } else {
      throw err
    }
  })
}

conMysql()

module.exports = conexion
