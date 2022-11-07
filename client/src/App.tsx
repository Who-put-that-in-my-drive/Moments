import './App.css';

import { Button, useColorMode } from '@chakra-ui/react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

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
            <Button display={'none'} onClick={toggleColorMode} position={'absolute'}>Toggle {colorMode} theme</Button>
            <Router>
                <Routes>
                    <Route element={<Navigate replace to='/login' />} path='/' />
                    <Route element={<Login />} path='login' />
                    <Route element={<Register />} path='register' />

                    <Route element={<Dashboard />} path='dashboard' >
                        <Route element={<Uploads />} path='home' />
                        <Route element={<Profile />} path='profile' />
                    </Route>

                </Routes>
            </Router>
        </>
    );
}

export default App;
