'use strict'

/**
 * @license
 * Configuración del servidor para el proyecto Leypal solutions
 */

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const cors = require('cors')
const app = express()
const { ApolloServer } = require('apollo-server')
const resolvers = require('./app/lib/resolvers')
const { join } = require('path')
const {readFileSync} = require('fs')  

// configuracion de puertos

// Middleware

// Configurar cabeceras y cors
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
//     res.header('Access-Control-Allow-Methods', 'GET, POST')
//     res.header('Allow', 'GET, POST')
//     next()
// })

/** Ruta estaticas */
// app.use('/static', express.static('public'))
app.use(cors())
app.set('graphport', process.env.GRAPHPORT || 4000)

// Definiendo el esquema de graphql
// const typeDefs = mergeTypes(fileLoader(`${__dirname}/*/.graphql`), { all: true })
const typeDefs = readFileSync(
    join(__dirname,'app','lib','schema.graphql'),'utf-8'
)
// Configurando el server de apollo
const server = new ApolloServer({
    typeDefs,
    resolvers
})

// Sirviendo puertos para peticiones
server.listen({ port: app.get('graphport') }).then(() => console.log('Ha iniciado graphql'))