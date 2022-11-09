import axios from 'axios';
import { UpdateFormDTO } from '../../pages/Profile';

axios.defaults.baseURL = process.env.SERVER_MODE === 'PRODUCTION' ? process.env.REACT_APP_DEV_SERVER_URL : process.env.REACT_APP_DEV_LOCAL_URL;

if (axios.defaults.baseURL?.includes('localhost')) {
    axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_ACCESS_TOKEN || '';
}

export const getUser = async (): Promise<Response> => {
    return await axios.get('/user');
};

export const updateUser = async (data: UpdateFormDTO): Promise<Response> => {
    const userData = { displayName: data.displayName, email: data.email, firstName: data.firstName, lastName: data.lastName };
    return await axios.put('/user', userData);
};

export const deleteUser = async (): Promise<Response> => {
    return await axios.delete('/user');
};
