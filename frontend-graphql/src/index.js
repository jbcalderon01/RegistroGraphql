import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Register from './components/Register/register'
import { BarradeNavegacion } from './components/navBar/navbar'
const client = new ApolloClient({
  uri: 'http://localhost:4000 ',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* <App /> */}
      <BarradeNavegacion/>
      <Register/>
    </ApolloProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

