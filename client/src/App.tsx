import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './components/Container';
import { ChakraProvider } from '@chakra-ui/react';


function App() {
    return (
        <ChakraProvider>
            <Router>
                <div className="App">
                    <Container />
                </div>
            </Router>
        </ChakraProvider>
    );
}

export default App;
