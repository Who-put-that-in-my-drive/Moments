import axios from 'axios';
import { UploadFormDTO } from '../../components/UploadModal';

axios.defaults.baseURL = process.env.SERVER_MODE === 'PRODUCTION' ? process.env.REACT_APP_DEV_SERVER_URL : process.env.REACT_APP_DEV_LOCAL_URL;

if (axios.defaults.baseURL?.includes('localhost')) {
    axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_ACCESS_TOKEN || '';
}

export const uploadImage = async (data: UploadFormDTO): Promise<Response> => {
    return await axios.post('/image', data);
};

export const uploadImageToS3 = async (image: any, presignedUrl: string, imageExt: string): Promise<any> => {
    // Using Vanilla JS Fetch since Ky/Axios has issues handling files
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'image/' + imageExt);

    const requestOptions = {
        body: image,
        headers: myHeaders,
        method: 'PUT',
        redirect: 'follow'
    };
   
    let responseFinal;

    await fetch(presignedUrl,
        // @ts-ignore
        requestOptions)
        .then((response) => {
            responseFinal = response;
        })
        .catch(error => error.response);

    return responseFinal;
};
