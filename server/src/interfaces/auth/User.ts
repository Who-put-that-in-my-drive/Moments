import {ImagesMap} from '../image/ImagesMap';

export interface UserModel {
    email: string;
    password: string;
    displayName: string;
    images: ImagesMap;
    lastLoginDateTime: number;
    createdDateTime: number;
}
