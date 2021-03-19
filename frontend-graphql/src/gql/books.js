import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
    query getBooks {
        getBooks {
            _id
            titulo
            descripcion
        }
    }  
`