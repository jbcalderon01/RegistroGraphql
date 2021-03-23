'use strict'
const connectDB = require('./db')

module.exports = {
        getUsers: async () => {
            let db
            let usuarios=[]
            try {
                db = await connectDB()
                usuarios= await db.collection('usuarios').find().toArray()
            } catch (error) {
                console.error(error) 
                }
                return usuarios
        },  getUser: async (root, {nombre}) => {
            let db
            let usuario
            try {
                db = await connectDB()
                usuario= await db.collection('usuarios').findOne({nombre: nombre})
                console.log(usuario)
            } catch (error) {
                console.error(error) 
                }
                return usuario
        }, 
        getBooks: async () => {
            let db
            let libros=[]
            try {
                db = await connectDB()
                libros= await db.collection('libros').find().toArray()
            } catch (error) {
                console.error(error) 
                }
                return libros
        },  getBook: async (root, {titulo}) => {
            let db
            let libro
            try {
                db = await connectDB()
                libro= await db.collection('libros').findOne({titulo: titulo})
                console.log(libro)
            } catch (error) {
                console.error(error) 
                }
                return libro
        } 
}