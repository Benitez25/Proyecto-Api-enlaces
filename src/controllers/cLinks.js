const jwt = require('jsonwebtoken')
const poolQuery = require('../database')
const helpersValidParams = require('../helpers/validParams')

const controllerLinks = {
    getLinks: function(req, res){
        jwt.verify(req.token, 'secretkey', async (err, authData) => {
            if(err){
                res.status(403).send({res: 'Acceso denegado.'})
            }else{
                const user_id = authData.loginUser.id
                const links = await poolQuery.query('SELECT * FROM links where user_id = ?', [user_id])
                res.send({links})
            }
        })
    },
    addLinks: function(req, res){
        jwt.verify(req.token, 'secretkey', async (err, authData) => {
            if(err){
                res.status(403).send({res: 'Acceso denegado.'})
            }else{
                const user_id = authData.loginUser.id
                const {title, url, description} = req.body
                const valid = helpersValidParams.valid([user_id])
                if(valid)return res.status(400).send({res: 'Faltan argumentos para completar el registro.'})
                else{
                    const newLink = { title, url, description, user_id }
                    await poolQuery.query('INSERT INTO links SET ?', [newLink])
                    res.status(200).send({status: 'Link creado.'})
                }
            }
        })
    },
    deleteLinks: function(req, res){
        jwt.verify(req.token, 'secretkey', async(err, authData) => {
            if(err){
                res.status(403).send({res: 'Acceso denegado.'})
            }else{
                const {id} = req.params
                const valid = helpersValidParams.valid([id])
                if(valid)return res.status(400).send({res: 'Falta un argumento para eliminar.'})
                else{
                    await poolQuery.query('DELETE FROM links WHERE ID = ?', [id])
                    res.status(200).send({status: 'Link eliminado.'})
                }
            }
        })
    },
    getLink: function (req, res){
        jwt.verify(req.token, 'secretkey', async(err, authData) => {
            if(err){
                res.status(403).send({res: 'Acceso denegado.'})
            }else{
                const {id} = req.params
                const valid = helpersValidParams.valid([id])
                if(valid)return res.status(400).send({res: 'Falta un argumento para mostrar la información de Link.'})
                else{
                    const links = await poolQuery.query('SELECT * FROM links WHERE ID = ?', [id])
                    if(links[0]) res.status(200).send({link:links[0]})
                    else res.status(404).send({res: 'Link no encontrado'})
                }
            }
        })
    },
    updateLink: function (req, res){
        jwt.verify(req.token, 'secretkey', async(err, authData) => {
            if(err){
                res.status(403).send({res: 'Acceso denegado.'})
            }else{
                const {id, title, url, description} = req.body
                const valid = helpersValidParams.valid([id])
                if(valid)return res.status(400).send({res: 'Falta un argumento para actualizar el Link.'})
                else{
                    const newLink = { title, description, url }
                    await poolQuery.query('UPDATE links set ? where id= ?', [newLink, id])
                    res.status(200).send({status: 'Link modificado.'})
                }
            }
        })
    }
}

module.exports = controllerLinks