import React, {useState,useEffect} from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {
        TextField, 
        FormControl,
        RadioGroup,
        FormControlLabel,
        Radio,
        FormLabel,
        Button,
        Container
    } 
from '@material-ui/core'
import { CREATE_USER } from '../../gql/users'
import { GET_USERS } from '../../gql/users'
import { Form, Form_Radio, Form_Date, Titulo, Form_Container, Container1,Button_Container} from './styled'




const Register=()=>{




    const [usuario, setUsuario] = useState([])
    const usuarioData=(event)=>{
        setUsuario({...usuario,[event.target.name]:event.target.value})
        console.log(usuario)
    }


    // ---- CONSUMIENDO API----
    const [crearUsuario, { error: errCreateUser }] = useMutation(CREATE_USER)
    const [getUsers,{data: dataUsers, loading: loadUsers,error:errorUsers}]= useLazyQuery(GET_USERS, {fetchPolicy: 'network-only'})
    


    const createUser=()=>{
        crearUsuario({variables: {data:usuario}})
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
                            name="nombre" 
                            label="Nombre" 
                            variant="outlined" 
                            onChange={usuarioData}
                            error
                            helperText="Ingresa el nombre"
                        />
                        <TextField 
                            name="apellido" 
                            label="Apellido" 
                            variant="outlined" 
                            onChange={usuarioData} 
                            style={{marginTop:'20px'}}
                            error
                            helperText="Ingresa el apellido"
                        />
                        <TextField 
                            name="edad" 
                            label="Edad" 
                            variant="outlined"  
                            onChange={usuarioData} 
                            style={{marginTop:'20px'}}
                            error
                            helperText="Ingresa el edad"
                        />
                    </Form_Date>
                    <Form_Radio>
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
                        <Button variant="contained" color="primary" onClick={()=>createUser()}>REGISTRAR</Button><br></br>
                        
                    <Button variant="contained" color="secondary" onClick={()=>getUsers()}>Mostrar Usuarios</Button>
                    </Button_Container>
                </form>
            </Form>
            </Form_Container>
        </Container1>
            {!!(loadUsers && !errorUsers) && <span>Cargando...</span> }
            {dataUsers?.getUsers?.map(user=><span>{user.nombre}<br/></span>)}
        </>
    )
} 

export default Register