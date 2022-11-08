import axios from 'axios';
import { LoginFormDTO } from '../../pages/Login';
import { RegisterFormDTO } from '../../pages/Register';

axios.defaults.baseURL = process.env.REACT_APP_DEV_SERVER_URL || 'https://momentsimagegallery.site';

export const login = async (data: LoginFormDTO): Promise<Response> => {
    const userData = { email: data.email, password: data.password };
    return await axios.post('/api/auth/login', userData);
};

export const registerUser = async (data: RegisterFormDTO): Promise<Response> => {
    const userData = { displayName: data.displayName, email: data.email, password: data.password };
    return await axios.post('/api/auth/register', userData);
};

export const logout = async (): Promise<void> => {
    return await axios.get('/api/auth/logout');
};