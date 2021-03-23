'use strict'
const { ApolloError } = require('apollo-server-errors')
const connectDB = require('./db')
const {ObjectID} = require('mongodb')
module.exports = {
    crearUsuario: async (root, {
        input
    }) => {
        let db
        let usuario
        try {
            db = await connectDB()
            usuario = await db.collection('usuarios').insertOne(input)
            input._id = usuario.insertedId
            return input
        } catch (error) {
            return new ApolloError('Error: true') 
        }
    },
    crearLibro: async (root, {
        input
    }) => {
        let db
        let libro
        try {
            db = await connectDB()
            libro = await db.collection('libros').insertOne(input)
            input._id = libro.insertedId
        } catch (error) {
            console.error(error)

        }
        return input
    },
    editarLibro: async (root, {
        input,
        titulo
    }) => {
        let db
        let libro
        try {
            db = await connectDB()
            libro = await db.collection('libros').updateOne({
                titulo: titulo
            }, {
                $set: input
            })
        } catch (error) {
            console.error(error)

        }
        return input
    },
    editarUsuario: async (root, {
        input,
        nombre
    }) => {
        let db
        let usuario
        try {
            db = await connectDB()
            usuario = await db.collection('usuarios').updateOne({
                nombre: nombre
            }, {
                $set: input
            })
        } catch (error) {
            console.error(error)

        }
        return input
    },
    addLibroUser: async (root, {
        Libro,
        nombre
    }) => {
        let db
        let usuario
        let libro
        try {
            db = await connectDB()
            libro = await db.collection('libros').findOne({
                titulo: Libro
            })
            usuario = await db.collection('usuarios').findOne({
                nombre: nombre
            })
            await db.collection('usuarios').updateOne({
                nombre: nombre
            }, {
                $addToSet: {
                    libro: Libro
                }
            })
        } catch (error) {
            console.error(error)

        }
        return usuario
    },
    crearAutor: async (root, {
        input
    }) => {
        let db
        let autor
        try {
            db = await connectDB()
            autor = await db.collection('autores').insertOne(input)
            input._id = autor.insertedId
        } catch (error) {
            console.log(error)
        }
        return input
    },    
    editarAutor: async (root,  { 
        autor,
        input
    }) => {
        let db
        let Autor
        try {
            db = await connectDB()
            Autor = await db.collection('autores').updateOne(
                {autor:autor}, {$set: input})
        } catch (error) {
            console.log(error)
        }
        return input
    },
    addAutor: async (root,{
        titulo,
        autor
    })=>{
        let db
        let libro
        let Autor
        try {
           db = await connectDB()
           libro = await db.collection('libros').findOne({titulo: titulo})
           Autor = await db.collection('autores').findOne({autor:autor})
            await db.collection('libros').updateOne(
                {titulo:titulo},
                {$addToSet:
                    {autor:autor} }
            )
        } catch (error) {
            console.error(error)
        }
        return libro
    },
    deleteUser: async (root,{ nombre })=>{
        let db
        let usuario
        try {
            db = await connectDB()
            usuario = await db.collection('usuarios').deleteOne({nombre: nombre})
            return usuario.deletedCount === 0 ? "Usuario no Econtrado" : "Usuario Eliminado"
        } catch (error) {
            console.error(error)
        }
    }
}