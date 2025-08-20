const express = require('express')
const morgan = require('morgan')
const config = require('./config')
const cors = require('cors')
const helmet = require('helmet')

const estudiantesRoutes = require('./routes/estudiantesRoutes')
const authRoutes = require('./routes/authRoutes')
const usuariosRoutes = require('./routes/usuariosRoutes')
const error = require('./red/errors')

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.disable('etag')

//Configuracion
app.set('port', config.app.port)

//Rutas
app.use('/api/estudiantes', estudiantesRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/auth', authRoutes)
app.use(error)

module.exports = app
