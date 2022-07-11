const express = require('express')
const morgan = require('morgan')
const auth = require('./routes/authentication')
const links = require('./routes/links')
const path = require('path')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Node Mysql API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}
const app = express()

//port
app.set('port', process.env.PORT || '5000')

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routes
app.get('/', (req, res, next) => {
    res.send({resultado:'NO NAVEGAR EN ESTA WEB'})
})
app.use('/api', auth)
app.use('/api', links)
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

//start
app.listen(app.get('port'), ()=>{
    console.log(`Conectado al puerto ${app.get('port')}`)
})