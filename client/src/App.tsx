import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import Container from './components/Container';
import Login from './pages/Login';
import Register from './pages/Register';
import { Button, useColorMode } from '@chakra-ui/react';
import Dashboard from './pages/Dashboard';
import { Uploads } from './pages/Uploads';
import { Profile } from './pages/Profile';
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
