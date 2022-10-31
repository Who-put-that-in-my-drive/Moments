export interface UserModel {
    email: string;
    password: string;
    displayName: string;
    images: [string];
    lastLoginDateTime: number;
    createdDateTime: number;
}
