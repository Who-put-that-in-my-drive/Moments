import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';

// import Container from './components/Container';
import Login from './pages/Login';
import Register from './pages/Register';
import { Button, useColorMode } from '@chakra-ui/react';
import UserProfile from './pages/UserProfile';

function App() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Button position={'relative'} onClick={toggleColorMode}>
                Toggle {colorMode} theme
            </Button>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* TODO: Make profile dynamic with UID */}
                    <Route path="/profile" element={<UserProfile />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
