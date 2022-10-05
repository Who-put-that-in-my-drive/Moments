import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

// import Container from './components/Container';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {

    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Navigate replace to='/login' />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </Router>
        </ChakraProvider >
    );
}

export default App;
