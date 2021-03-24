import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import { ApolloClient, ApolloProvider, from, InMemoryCache } from '@apollo/client'
import Register from './components/Register/register'
import { BarradeNavegacion } from './components/navBar/navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { RegisteredUsers } from './components/usersRegistered/usersRegistered'
// import InputHooks from './InputHooks'


const client = new ApolloClient({
  uri: 'http://localhost:4000 ',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <BarradeNavegacion/>
      <Switch>
        <Route path="/home" exact>
            {/* <InputHooks/> */}
        </Route>
        <Route path="/register">
        <ApolloProvider client={client}>
        {/* <App /> */}
        <Register/>
        </ApolloProvider>
        </Route>
        <Route path="/registeredUsers">
        <ApolloProvider client={client}>
          <RegisteredUsers/>  
          </ApolloProvider>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

