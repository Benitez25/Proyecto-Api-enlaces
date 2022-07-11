const express = require('express')
const router = express.Router()
const cLinks = require('../controllers/cLinks')
    /**
     * @swagger
     * components:
     *  schemas:
     *      User:
     *          type: object
     *          properties:
     *              username:
     *                  type: string
     *                  description: usernamed
     *              password:
     *                  type: string
     *                  description: passwordd
     *          example:
     *              username: xyz
     *              password: xyz
     *      Link:
     *          type: object
     *          properties:
     *              title:
     *                  type: string
     *                  description: the link title
     *              url:
     *                  type: string
     *                  description: the link url
     *              description:
     *                  type: string
     *                  description: the lunk description
     *          example:
     *              title: Google
     *              url: www.google.com
     *              description: Pagia de busqueda. 
     *  securitySchemes:
     *      bearerAuth:
     *          type: http
     *          scheme: bearer
     *          bearerFormat: JWT
     * security:
     *  - bearerAuth: [admin]
     */
  
    /**
    * @swagger
    * /api/addLinks:
    *   post:
    *       security:
    *           - bearerAuth: [admin]
    *       sumary: create a new link
    *       tags: [Link]
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       $ref: '#/components/schemas/Link'
    *       responses:
    *           200:
    *               description: New Link created!
    *           403:        
    *               description: Not authorized
    * 
    *  */ 
router.post('/addLinks', verifyToken ,cLinks.addLinks)
    /**
    * @swagger
    * /api/links:
    *   get:
    *       security:
    *           - bearerAuth: [admin]
    *       sumary: return all links
    *       tags: [Link]
    *       responses:
    *           200:
    *               description: All users
    *               content: 
    *                  application/json:
    *                       schema:
    *                           type: array
    *                           items:
    *                               $ref: '#/components/schemas/Link'
    *           403:        
    *               description: Not authorized
    * 
    *  */ 
router.get('/links', verifyToken ,cLinks.getLinks)
    /**
    * @swagger
    * /api/getLink/{id}:
    *   get:
    *       security:
    *           - bearerAuth: [admin]
    *       sumary: return a link
    *       tags: [Link]
    *       parameters:
    *           -   in: path
    *               name: id
    *               schema: 
    *                   type: number
    *               required:
    *               description: the link id
    *       responses:
    *           200:
    *               description: All users
    *               content: 
    *                  application/json:
    *                       schema:
    *                           type: object
    *                           $ref: '#/components/schemas/Link'
    *           403:        
    *               description: Not authorized
    *           404:
    *               description:    user not found
    *  */ 
router.get('/getLink/:id', verifyToken ,cLinks.getLink)
    /**
    * @swagger
    * /api/deleteLinks/{id}:
    *   delete:
    *       security:
    *           - bearerAuth: [admin]
    *       sumary: link deleted
    *       tags: [Link]
    *       parameters:
    *           -   in: path
    *               name: id
    *               schema: 
    *                   type: number
    *               required:
    *               description: the link id
    *       responses:
    *           200:
    *               description: link deleted
    *           403:        
    *               description: Not authorized
    *           404:
    *               description:    link not found
    *  */ 
router.delete('/deleteLinks/:id', verifyToken ,cLinks.deleteLinks)
/**
    * @swagger
    * /api/deleteLinks/{id}:
    *   put:
    *       security:
    *           - bearerAuth: [admin]
    *       sumary: link update
    *       tags: [Link]
    *       parameters:
    *           -   in: path
    *               name: id
    *               schema: 
    *                   type: number
    *               required:
    *               description: the link id
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       $ref: '#/components/schemas/Link'
    *       responses:
    *           200:
    *               description: link update
    *           403:        
    *               description: Not authorized
    *           404:
    *               description:    link not found
    *  */ 
router.put('/updateLink', verifyToken ,cLinks.updateLink)


function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}

module.exports = router