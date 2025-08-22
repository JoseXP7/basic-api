const express = require('express')

const estudianteController = require('../controllers/estudianteController')
const verificarToken = require('../middleware/auth')
const permitirRoles = require('../middleware/rbac')

const router = express.Router()

router.get('/', estudianteController.todos)
router.get('/:id', estudianteController.uno)
router.post(
  '/',
  verificarToken,
  permitirRoles('supersu', 'admin', 'docente'),
  estudianteController.agregar
)
router.put(
  '/',
  verificarToken,
  permitirRoles('supersu', 'admin', 'docente'),
  estudianteController.actualizar
)
router.delete(
  '/:id',
  verificarToken,
  permitirRoles('supersu', 'admin', 'docente'),
  estudianteController.eliminar
)

module.exports = router
