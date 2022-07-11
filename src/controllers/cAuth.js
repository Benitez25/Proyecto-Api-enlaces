const jwt = require('jsonwebtoken')
const poolQuery = require('../database')
const helpersBcryptjs = require('../helpers/bcryptjs')
const helpersValidParams = require('../helpers/validParams')

const controllerAuth = {
    login: async function(req, res){
        const { username , password } = req.body
        const valid = helpersValidParams.valid([username , password])
        if(valid) return res.status(400).send({res: 'Faltan argumentos para completar el registro'})
        else{
            const loginUser = { username, password }
            const rows = await poolQuery.query('SELECT * FROM users WHERE username = ?', [loginUser.username])
            if(rows.length > 0) {
                const user = rows[0]
                const validPassword = await helpersBcryptjs.matchPassword(loginUser.password, user.password)
                if(validPassword){
                    loginUser.id= user.id
                    jwt.sign({loginUser}, 'secretkey', (err, token) => {
                        return res.status(200).send({token})
                    })
                }else{
                    return res.status(500).send({res: 'Usuario no registrado.'})
                }
            }else{
                return res.status(500).send({res: 'Usuario no registrado.'})
            }
        }
    },
    createUser: async function (req, res){
        const { username , password, fullname } = req.body
        const valid = helpersValidParams.valid([username , password])
        if(valid) return res.status(400).send({res: 'Faltan argumentos para completar el registro'})
        else{
            const newUser = { username, password, fullname }
            try {
                newUser.password = await helpersBcryptjs.encrypPassWord(password)
                await poolQuery.query('INSERT INTO users SET ?', [newUser])
                res.status(200).send({res: 'Se registro Correctamente.'})    
            } catch (error) {
                res.status(404).send({res: 'Error duplicidad'})
            }
            
        }
    }
}

module.exports = controllerAuth