import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

// import Container from './components/Container';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
                <div className="App">
                    {/* <Container /> */}
                </div>
            </Router>
        </ChakraProvider>
    );
}

export default App;
