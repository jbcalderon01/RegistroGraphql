import React, {useState}from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_USERS } from '../../gql/users'
import {
    Table,
    TableData,
    TableHead,
    TableHeadItems,
    TableDataContainer,
    Circle,
} from './styled'




//----- TABLA DE DATOS -----

    export const RegisteredUsers = () => {
        
        const {data: UsuarioData, loading: UsuarioLoading, error: UsuarioError} = useQuery(GET_USERS)
        
  return (
      <><div style={{padding: '50px'}}>
        <h2 style={{textAlign:'center'}}>USUARIOS REGISTRADOS</h2>

      <Table>
        <TableHead>
            <TableHeadItems>Nombre</TableHeadItems><TableHeadItems>Apellido</TableHeadItems><TableHeadItems>Edad</TableHeadItems><TableHeadItems>Genero</TableHeadItems>
        </TableHead>
        {UsuarioData?.getUsers?.map(user =>
            <TableDataContainer>
                <TableData>{user.nombre}</TableData><TableData>{user.apellido}</TableData><TableData>{user.edad}</TableData><TableData style={{display:'flex'}}><Circle background={user.genero==="Masculino"?"#00AAE4":user.genero==="Femenino"?"#FFB4BF":"#CDCDCD"}></Circle>{user.genero} </TableData>
            </TableDataContainer>
            )}

      </Table>

      </div>
      {console.log(UsuarioData)}

    </>
  );
}