import React, { useState,useEffect } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import './App.css';
import { CREATE_USER, GET_USERS } from './gql/users';
import { GET_BOOKS } from './gql/books';

function App() {
  const [values, setValues] = useState({
      nombre: "Jesus",
      apellido: "Juvinao",
      edad: "55",
      genero: "Masculino"
  })
  const { data, loading, error } = useQuery(GET_USERS)
  const [getBooks, { data: dataBooks, loading: loadBooks, error: errBooks }] = useLazyQuery(GET_BOOKS)
  const [createUser, { error: errCreateUser }] = useMutation(CREATE_USER)

  const handleRegister = () => {
    createUser({ variables: { data: values }, 
      update(cache, { data: { crearUsuario } }){
        cache.modify({
          fields: {
            getUsers(dataOld = []){
              return [...dataOld, { ...crearUsuario }]
            }
          }
        })
      } 
    }).then(console.log).catch(e => alert(e?.message || 'Ha ocurrido un error' ))
  }

  console.log(dataBooks)

  return (
    <div>
      <button onClick={() => getBooks()}>obtener libros</button>
      <button onClick={handleRegister}>Crear usuario</button>
      {!!((loading && !error) || (loadBooks && !errBooks)) && <span>Cargando datos...</span>}
        {data?.getUsers?.map(user => <span key={user._id}>{user.nombre}<br/></span>)}
        
    </div>
  );
}

export default App;
