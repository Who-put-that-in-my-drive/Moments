import axios from 'axios';
import { UpdateFormDTO } from '../../pages/Profile';

axios.defaults.baseURL = process.env.REACT_APP_DEV_SERVER_URL || 'https://momentsimagegallery.site';

export const getUser = async (): Promise<Response> => {
    return await axios.get('/api/auth/login');
};

export const updateUser = async (data: UpdateFormDTO): Promise<Response> => {
    const userData = { displayName: data.displayName, email: data.email, firstName: data.firstName, lastName: data.lastName };
    return await axios.put('/api/user', userData);
};

export const deleteUser = async (): Promise<Response> => {
    return await axios.delete('/api/user');
};
