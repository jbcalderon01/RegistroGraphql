import React from  'react'
import { AppBar,Toolbar, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

export const BarradeNavegacion = () =>{
    return (
<AppBar position="static">
  <Toolbar style={{justifyContent:'flex-end'}}>
    <Button ><Link style={{textDecoration: 'none', color: '#ffff'}} to="/register">Crear Usuario</Link></Button>
    <Button ><Link style={{textDecoration: 'none', color: '#ffff'}} to="/registeredUsers">Usuarios Registrados</Link></Button>
  </Toolbar>
</AppBar>
    )
}