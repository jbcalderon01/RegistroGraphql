
const { ApolloError } = require('apollo-server-errors')
const connectDB = require('./db')

module.exports = {
   Query: {
        getUsers: async () => {
            let db
            let usuarios=[]
            try {
                db = await connectDB()
                usuarios= await db.collection('usuarios').find().toArray()
                return usuarios
            } catch (error) {
                return new ApolloError('Error: true') 
            }
        },
    getUser: (args)=> console.log(args.nombre)
    }
}