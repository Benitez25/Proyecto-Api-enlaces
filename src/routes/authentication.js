const express = require('express')
const router = express.Router()
const cAuth = require('../controllers/cAuth')
    /**
    * @swagger
    * /api/login:
    *   post:
    *       sumary: get token
    *       tags: [Login]
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       $ref: '#/components/schemas/User'
    *       responses:
    *           200:
    *               description: token
    *  */ 
router.post('/login', cAuth.login)
router.post('/createUser', cAuth.createUser)

module.exports = router
