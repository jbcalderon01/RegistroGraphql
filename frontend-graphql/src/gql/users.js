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