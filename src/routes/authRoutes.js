const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/login', authController.login)
router.post('/', authController.agregar)
router.put('/:id', authController.actualizar)

module.exports = router
