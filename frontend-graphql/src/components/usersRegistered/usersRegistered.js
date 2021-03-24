import React, {useState}from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_USERS, MODIFY_USER, DELETE_USER } from '../../gql/users'
import {
    Table,
    TableData,
    TableHead,
    TableHeadItems,
    TableDataContainer,
    Circle,
    EditUserContainer,
    EditUserForm,
    ItemsContainerEditForm,
    ButtonContainer,
    Loading,
} from './styled'
import { Button,TextField,FormControl,RadioGroup,FormLabel,FormControlLabel,Radio, InputLabel,Select } from '@material-ui/core'
import Swal from 'sweetalert2'
import { NoUnusedFragmentsRule } from 'graphql';





export const RegisteredUsers = () => {
  const {data: UsuarioData, loading: UsuarioLoading, error: UsuarioError} = useQuery(GET_USERS)
  
  const [deleteUser,{ error: errDeleteUser }] = useMutation(DELETE_USER)
  const [modifyUser, { error: errModifyUser }] = useMutation(MODIFY_USER)


  const eliminarUsuario = (nombre,apellido) => { 
    Swal.fire({
      title: `¿Seguro que quiere eliminar a ${nombre} ${apellido}?`,
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        let usuario
        usuario = UsuarioData.getUsers.filter(user=>user.nombre !== nombre)
        deleteUser({variables: {nombre: nombre},
          update(cache, { data: UsuarioData }){
            cache.modify({
              fields:{
                getUsers(dataOld = []){
                    return cache.writeQuery({ query: GET_USERS, data: [...dataOld, {...usuario}] })
                  }
            }
          })
        }})
        Swal.fire({
          icon: 'success',
          title: 'Usuario eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (result.isDenied) {
        Swal.fire({
          icon: 'error',
          title: 'Usuario no eliminado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  const [userModify,setUserModify] = useState({})
  const [active, setActive ] = useState(false) 
  const [btnDelete, setBtnDelete] = useState(false)
  
  const obtUsuario = (user) => {
    setUsuarioModificar(user.nombre)
    const newObject = filterKeyObject(user, ['_id','__typename'])
    setUserModify(newObject)
    setActive(true)
    setBtnDelete(true)
    
  }

  const filterKeyObject = (data, filters) => {
    let values = {}
    for (const elem in data) {
        let coincidence = false
        for (let i = 0; i < filters.length; i++) if (elem === filters[i]) coincidence = true

        if (!coincidence) values = { ...values, [elem]: data[elem] }
    }

    return values
}
  const modificarUsuario = (event) =>{
   
    setUserModify({...userModify, [event.target.name]:event.target.value})
    
  }
  const guardarCambios = () =>{
    modifyUser({variables:{nombre: usuarioModificar, data: userModify},
      update(cache, {data: UsuarioData}){
        cache.modify({
          fields:{
            getUsers(dataOld=[]){
              return cache.writeQuery({query: GET_USERS, data: [...dataOld, userModify]})
            }
          }
        })
      }})
      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      setBtnDelete(false)
      setActive(false)
    }
  const [usuarioModificar, setUsuarioModificar] = useState()
  return (
    <>
          {/* Formulario Actualizar Usuario */}
        <EditUserContainer>
          <EditUserForm active={active}>
            <form  noValidate autoComplete="off">
          <h1>Actualizar Datos del Usuario</h1>
              
                <ItemsContainerEditForm> 
                  <TextField style={{marginTop: '20px', marginRight: '20px'}} label="Nombre" variant="outlined" value={userModify.nombre} name="nombre" onChange={modificarUsuario} required/>
                  <TextField style={{marginTop: '20px'}} label="Apellido" variant="outlined" value={userModify.apellido} name="apellido" onChange={modificarUsuario} required/>
                </ItemsContainerEditForm>
                <ItemsContainerEditForm>
                  <TextField type="number" style={{marginTop: '20px'}} label="Edad" variant="outlined" value={userModify.edad} name="edad" onChange={modificarUsuario}  required/>
                  <FormControl style={{marginTop: '20px', display:'block'}} variant='outlined' required>
                    <InputLabel>Genero</InputLabel>
                    <Select
                     style={{width: '180px'}}
                      native
                      onChange={modificarUsuario}
                      value={userModify.genero}
                      label='Genero'
                      inputProps={{
                        name: 'genero',
                      }}
                      >
                      <option value={"Masculino"}>Masculino</option>
                      <option value={"Femenino"}>Femenino</option>
                      <option value={"Otro"}>Otro</option>
                    </Select>
                  </FormControl>
              </ItemsContainerEditForm>
              <ButtonContainer>
                <Button style={{width:'50%'}} variant="contained" color="primary" onClick={()=>guardarCambios()} >Guardar Cambios</Button>
                <Button style={{width:'50%', marginTop: '20px'}} variant="contained" color="secondary" onClick={()=>{setActive(false);setBtnDelete(false)}}>Cancelar</Button>
              </ButtonContainer>
            </form>
          </EditUserForm>
        </EditUserContainer>
          
    <div style={{padding: '50px'}}>
        <h2 style={{textAlign:'center'}}>USUARIOS REGISTRADOS</h2>
       
        {/* Tabla de Datos */}
      <Table>
        <TableHead>
            <TableHeadItems>Nombre</TableHeadItems><TableHeadItems>Apellido</TableHeadItems><TableHeadItems>Edad</TableHeadItems><TableHeadItems>Genero</TableHeadItems><TableHeadItems>Accion</TableHeadItems>
        </TableHead>
        {!!(UsuarioLoading && !UsuarioError) && <Loading></Loading>}
        {UsuarioData?.getUsers?.map(user =>
            <TableDataContainer>
                <TableData key={user._id}>{user.nombre}</TableData>
                <TableData>{user.apellido}</TableData>
                <TableData>{user.edad}</TableData>
                <TableData style={{display:'flex'}}><Circle background={user.genero==="Masculino"?"#00AAE4":user.genero==="Femenino"?"#FFB4BF":"#CDCDCD"}></Circle>{user.genero}</TableData>
                <TableData style={{padding: '0px'}} >
                  <Button style={{marginLeft: '10px', height: '28px'}} variant='outlined' color='secondary'onClick={()=>eliminarUsuario(user.nombre,user.apellido)} disabled={btnDelete} >Eliminar</Button>
                  <Button style={{marginLeft: '10px', height: '28px'}} variant='outlined' color="primary"  onClick={()=>obtUsuario(user)}>Editar</Button>
                </TableData>
            </TableDataContainer>
            )}

      </Table>

      </div>
      

    </>
  );
}