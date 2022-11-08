import {ImagesMap} from '../image/ImagesMap';

export interface SanitizedUser {
    email: string;
    password?: string;
    displayName: string;
    images: ImagesMap;
    lastLoginDateTime: number;
    createdDateTime: number;
}
