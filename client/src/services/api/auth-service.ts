import axios from 'axios';
import { LoginFormDTO } from '../../pages/Login';
import { RegisterFormDTO } from '../../pages/Register';

axios.defaults.baseURL = process.env.SERVER_MODE === 'PRODUCTION' ? process.env.REACT_APP_DEV_SERVER_URL : process.env.REACT_APP_DEV_LOCAL_URL;

if (axios.defaults.baseURL?.includes('localhost')) {
    axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_ACCESS_TOKEN || '';
}

export const login = async (data: LoginFormDTO): Promise<Response> => {
    const userData = { email: data.email, password: data.password };
    return await axios.post('/auth/login', userData);
};

export const registerUser = async (data: RegisterFormDTO): Promise<Response> => {
    const userData = { displayName: data.displayName, email: data.email, password: data.password };
    return await axios.post('/auth/register', userData);
};

export const logout = async (): Promise<void> => {
    return await axios.get('/auth/logout');
};
