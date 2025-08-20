const express = require('express')
const usuarioController = require('../controllers/usuarioController')
const verificarToken = require('../middleware/auth')
const permitirRoles = require('../middleware/rbac')

const router = express.Router()

router.use(verificarToken)

router.get('/', permitirRoles('supersu', 'admin'), usuarioController.todos)
router.get('/:id', permitirRoles('supersu', 'admin'), usuarioController.uno)
router.post('/', permitirRoles('supersu'), usuarioController.agregar)
router.put('/:id', permitirRoles('supersu'), usuarioController.actualizar)
router.delete('/:id', permitirRoles('supersu'), usuarioController.eliminar)

module.exports = router
