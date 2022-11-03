import './App.css';

import { Button, useColorMode } from '@chakra-ui/react';
import { BrowserRouter as Router, Navigate,Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
// import Container from './components/Container';
import Login from './pages/Login';
import { Profile } from './pages/Profile';
import Register from './pages/Register';
import { Uploads } from './pages/Uploads';
// import ProtectedRoutes from './ProtectedRoutes';


function App() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Button display={'none'} position={'absolute'} onClick={toggleColorMode}>Toggle {colorMode} theme</Button>
            <Router>
                <Routes>
                    <Route path='/' element={<Navigate replace to='/login' />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />

                    <Route path='dashboard' element={<Dashboard />} >
                        <Route path='home' element={<Uploads />} />
                        <Route path='profile' element={<Profile />} />
                    </Route>

                </Routes>
            </Router>

        </>
    );
}

export default App;
