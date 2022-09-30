import React from 'react';
import './App.css';
import Container from './components/Container';
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  return (
      <ChakraProvider>
        <div className="App">
          <Container />
        </div>
      </ChakraProvider>

  );
}

export default App;
