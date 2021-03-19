'use strict'
const connectDB=require('./db')

module.exports={
    Usuarios:{
        libro: async ({libro})=>{
        let db
        let libroData
        let titulos
        try {
            db= await connectDB() 
            titulos = libro ? libro.map(titulo => titulo):[]
            libroData = titulos.length > 0 ? await db.collection('libros').find(
                {titulo: { $in: titulos }}
            ).toArray(): []
        } catch (error) {
            console.log(error)
        }
        return libroData
            }
    },
    Libros:{
        autor: async ({ autor })=>{
            let db
            let autorData
            let autores
            try {
                db = await connectDB()
                autores = autor ? autor.map(autor=>autor):[]
                autorData = autores.length > 0 ? await db.collection('autores').find(
                    {autor: { $in: autores }}
                ).toArray():[]
            } catch (error) {
                console.error(error)
            }
            return autorData
        }
    }

    }

