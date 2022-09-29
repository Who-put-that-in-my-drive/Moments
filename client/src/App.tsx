import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import Container from './components/Container';
import { ChakraProvider } from '@chakra-ui/react';
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql"
});


function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <div className="App">
          <Container />
        </div>
      </ChakraProvider>
    </ApolloProvider>

  );
}

export default App;
