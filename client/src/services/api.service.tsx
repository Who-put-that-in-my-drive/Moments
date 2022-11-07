import axios from 'axios';
import { LoginFormValues } from '../pages/Login';
import { RegisterFormValues } from '../pages/Register';
import { getServerUrl } from '../utils/WebsiteUtils';

export const login = async (data: LoginFormValues): Promise<Response> => {
    const userData = { email: data.email, password: data.password };
    const URL = getServerUrl();
    return await axios.post(URL + '/api/auth/login', userData);
};

export const registerUser = async (data: RegisterFormValues): Promise<Response> => {
    const userData = { displayName: data.displayName, email: data.email, password: data.password };
    const URL = getServerUrl();
    return await axios.post(URL + '/api/auth/register', userData);
};
