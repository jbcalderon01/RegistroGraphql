import React, {useState, useEffect} from 'react'
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
import { IconUser } from '../../assets/icons'
import { onlyLetters } from '../../utils/index'


const Register=()=>{


    // Declarando el estado
    const [errors, setError] = useState()
    const [message, setMessage] = useState('El campo no debe estar vacío')

    // Función para activar el error
    const errorFunc = ( e,v, m,n) => {
        setError(v)
        setMessage(m)
        setCheckData({...checkData,[n]:v})
    }
    useEffect(() => {
        setError(false)
        
    }, [])

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
   


    //----- Funcion Crear Usuario -----
    const [errorCreateUser, setErrorCreateUser] = useState(true)
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
        }).catch(error => setErrorCreateUser(false))

        errorCreateUser ?
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Usuario registrado correctamente',
            showConfirmButton: true,
        })   : 
        Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'A ocurrido un error al crear el usuario, intenta de nuevo',
                showConfirmButton: true,
            }) 
        setUsuario({nombre:"",apellido:"",edad:"",genero:""})
    }
    const validations = e => {
        // Valida que el campo sea solo letras
        if (e.target.value) {
            if (onlyLetters(e.target.value)) return errorFunc(e, true, 'El campo debe contener solo letras',e.target.name)
            else errorFunc(e, false, 'si estas ingresando letras',e.target.name)
        }
        if(!errors) return setUsuario({ ...usuario, [e.target.name]:e.target.value}) 
    }
    //--- FUNCION CREAR USUARIO CON VALIDACION DE DATOS ---
    const createUser=()=>{
        usuario.nombre === "" && usuario.apellido === "" && usuario.edad === "" && usuario.genero === "" ? setCheckData({nombre: true, apellido: true, edad: true, radioGender: true}):
        usuario.apellido === "" && usuario.genero ==="" && usuario.edad === "" ? setCheckData({edad:true,radioGender:true,apellido:true, nombre:false}):
        usuario.nombre === "" && usuario.genero === "" && usuario.edad === "" ? setCheckData({nombre:true, radioGender: true, edad: true, apellido:false}):
        usuario.apellido === "" && usuario.nombre === "" && usuario.genero === "" ? setCheckData({apellido:true,edad:false,radioGender:true,nombre:true}):
        usuario.apellido === "" && usuario.nombre === "" && usuario.edad === "" ? setCheckData({apellido:true,edad:true,radioGender:false,nombre:true}):
        usuario.apellido === "" && usuario.genero === "" ? setCheckData({edad:false, apellido:true, nombre:false, radioGender:true}):
        usuario.nombre === "" && usuario.genero === "" ? setCheckData({edad:false, apellido:false, nombre:true, radioGender:true}):
        usuario.nombre === "" && usuario.apellido === "" ? setCheckData({nombre: true, apellido: true, edad: false,radioGender: false}):
        usuario.apellido === "" && usuario.edad === "" ? setCheckData({apellido: true, edad: true, nombre: false,radioGender: false}):
        usuario.nombre === "" && usuario.edad === "" ? setCheckData({nombre: true, edad: true, apellido: false,radioGender: false}):
        usuario.edad === "" && usuario.genero === "" ? setCheckData({radioGender: true, edad: true, nombre: false, apellido: false}):
        usuario.genero === "" ? setCheckData({edad:false, apellido:false, nombre:false, radioGender:true}):
        usuario.apellido === "" ? setCheckData({apellido: true, edad:false, nombre: false}):
        usuario.nombre === "" ? setCheckData({nombre: true, apellido: false, edad:false}):
        usuario.edad === "" ? setCheckData( {edad: true, nombre: false, apellido:false}):
        crearUsr()
    }
    


    return(

        <>
        <Container1>
            <Form_Container>
                <IconUser  size='100px'/>
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
                            onChange = {validations}
                            error = {checkData.nombre}
                            helperText = {checkData.nombre === true ? "Ingresa el nombre" : ""}
                            required
                            value={usuario.nombre}
                        />
                        <TextField 
                            name = "apellido" 
                            label = "Apellido" 
                            variant = "outlined" 
                            onChange = {validations} 
                            value = {usuario.apellido}
                            style = {{marginTop:'20px'}}
                            error = {checkData.apellido}
                            helperText = {checkData.apellido === true ? "Ingresa el apellido" : ""}
                            required
                        />
                        <TextField 
                            type="number"
                            name = "edad" 
                            label = "Edad" 
                            variant = "outlined"  
                            onChange = {usuarioData} 
                            style = {{marginTop:'20px'}}
                            error = {checkData.edad}
                            helperText = {checkData.edad === true ? "Ingresa la edad" : ""}
                            value = {usuario.edad} 
                            required
                        />
                    </Form_Date>
                    <Form_Radio border={checkData.radioGender === true ? '1px solid red' : '' }>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Genero *</FormLabel >
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