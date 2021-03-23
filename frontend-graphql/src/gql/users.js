import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query getUsers {
        getUsers {
            _id
            nombre
            apellido
            edad
            genero
        }
    }
`

export const CREATE_USER = gql`
    mutation crearUsuario($data: UsuarioInput!) {
        crearUsuario(input: $data) {
            _id,
            nombre
            apellido
            edad
        }
    }
`
export const MODIFY_USER = gql`
mutation ($nombre: String!, $data: editarUsuarioInput!){
  editarUsuario(nombre: $nombre, input: $data){
    nombre
    apellido
  }
}

`

export const DELETE_USER = gql`
mutation DELETE_USER($nombre: String!){
  deleteUser(nombre:$nombre)
}

`