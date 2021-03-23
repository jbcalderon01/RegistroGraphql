import React, {useState} from 'react'
import {useLazyQuery, useMutation } from '@apollo/client'
import {
        TextField, 
        FormControl,
        RadioGroup,
        FormControlLabel,
        Radio,
        FormLabel,
        Button,
    } 
from '@material-ui/core'
import { CREATE_USER } from '../../gql/users'
import { GET_USERS } from '../../gql/users'
import { Form, Form_Radio, Form_Date, Titulo, Form_Container, Container1,Button_Container} from './styled'
import Swal from 'sweetalert2'



const Register=()=>{




    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        genero: ""
    })

    // ---- CAPTURANDO EVENTO DE LOS TEXTFIELD -----
    const usuarioData = ( event )=>{
        setUsuario({...usuario,[event.target.name]:event.target.value})
    }

    // ---- CHECKDATA DEL FORM ----
    const [checkData, setCheckData] = useState({})

    // ---- CONSUMIENDO API----
    const [crearUsuario, { error: errCreateUser }] = useMutation(CREATE_USER)
    const [getUsers,{data: dataUsers, loading: loadUsers,error:errorUsers}]= useLazyQuery(GET_USERS, {fetchPolicy: 'network-only'})


    //----- Funcion Crear Usuario -----
    const crearUsr = () => {
        crearUsuario({variables: {data:usuario}, 
            update(cache, { data: crearUsuario }){
                cache.modify({
                    fields: {
                        getUsers(dataOld = []){
                            return cache.writeQuery({ query: GET_USERS, data: [ ...dataOld, { ...crearUsuario } ] })
                        }
                    }
                })
            }
        })
        setUsuario({nombre:"",apellido:"",edad:""})
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario Registrado Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
    }


    const createUser=()=>{
        usuario.nombre === "" && usuario.apellido === "" && usuario.edad === "" && usuario.genero === "" ? setCheckData({textName: true, textSurname: true, textAge: true, radioGender: true}):
        usuario.apellido === "" && usuario.genero ==="" && usuario.edad === "" ? setCheckData({textAge:true,radioGender:true,textSurname:true, textName:false}):
        usuario.nombre === "" && usuario.genero === "" && usuario.edad === "" ? setCheckData({textName:true, radioGender: true, textAge: true, textSurname:false}):
        usuario.apellido === "" && usuario.nombre === "" && usuario.genero === "" ? setCheckData({textSurname:true,textAge:false,radioGender:true,textName:true}):
        usuario.apellido === "" && usuario.nombre === "" && usuario.edad === "" ? setCheckData({textSurname:true,textAge:true,radioGender:false,textName:true}):
        usuario.apellido === "" && usuario.genero === "" ? setCheckData({textAge:false, textSurname:true, textName:false, radioGender:true}):
        usuario.nombre === "" && usuario.genero === "" ? setCheckData({textAge:false, textSurname:false, textName:true, radioGender:true}):
        usuario.nombre === "" && usuario.apellido === "" ? setCheckData({textName: true, textSurname: true, textAge: false}):
        usuario.apellido === "" && usuario.edad === "" ? setCheckData({textSurname: true, textAge: true, textName: false}):
        usuario.nombre === "" && usuario.edad === "" ? setCheckData({textName: true, textAge: true, textSurname: false}):
        usuario.genero === "" ? setCheckData({textAge:false, textSurname:false, textName:false, radioGender:true}):
        usuario.apellido === "" ? setCheckData({textSurname: true, textAge:false, textName: false}):
        usuario.nombre === "" ? setCheckData({textName: true, textSurname: false, textAge:false}):
        usuario.edad === "" ? setCheckData( {textAge: true, textName: false, textSurname:false}):
        crearUsr()
        


    }
    


    return(

        <>
        <Container1>
            <Form_Container>
            <Titulo>
                Crear Usuario
            </Titulo>
            <Form>
                <form>
                    <Form_Date>
                        <TextField 
                            name = "nombre" 
                            label = "Nombre" 
                            variant = "outlined" 
                            onChange = {usuarioData}
                            error = {checkData.textName}
                            helperText = {checkData.textName===true?"Ingresa el nombre":""}
                            value={usuario.nombre}
                        />
                        <TextField 
                            name = "apellido" 
                            label = "Apellido" 
                            variant = "outlined" 
                            onChange = {usuarioData} 
                            style = {{marginTop:'20px'}}
                            error = {checkData.textSurname}
                            helperText={checkData.textSurname === true ? "Ingresa el apellido" : ""}
                            value={usuario.apellido}
                        />
                        <TextField 
                            name = "edad" 
                            label = "Edad" 
                            variant = "outlined"  
                            onChange = {usuarioData} 
                            style = {{marginTop:'20px'}}
                            error = {checkData.textAge}
                            helperText = {checkData.textAge === true ? "Ingresa la edad" : ""}
                            value = {usuario.edad} 
                        />
                    </Form_Date>
                    <Form_Radio border={checkData.radioGender === true ? '1px solid red' : '' }>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Genero</FormLabel >
                            <RadioGroup style={{ display:'flex', flexDirection:'row' }} aria-label="gender" name="genero" onChange={usuarioData}>
                                <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
                                <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                                <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                            </RadioGroup>
                        </FormControl>
                    </Form_Radio>
                    <Button_Container>
                        <Button variant="contained" color="primary" onClick={()=>createUser()}>Crear Usuario</Button><br></br>
                    </Button_Container>
                </form>
            </Form>
            </Form_Container>
        </Container1>

        </>
    )
} 

export default Register