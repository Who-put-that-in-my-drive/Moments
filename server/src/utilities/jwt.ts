import * as jwt from 'jsonwebtoken';
import {Request} from 'express';

const secret = process.env.JWT_SECRET as string;

export default class Jwt {
    /**
     * Generates JWT For Protected Routes
     *
     * @param email
     * @return JWT
     */
    static async generateJwt(email: string): Promise<string> {
        return new Promise(resolve => {
            resolve(jwt.sign(
                {
                    sub: email
                },
                secret
            ));
        });
    }

    /**
     * Expires JWT For Protected Routes
     *
     * @return JWT
     */
    static expireJwt(): Promise<string> {
        return new Promise(resolve => {
            resolve('');
        });
    }

    /**
     * Gets accessToken from Cookie
     */
    static getAccessTokenCookie(req: Request): Promise<string> {
        return new Promise(resolve => {
            resolve(req.cookies.accessToken);
        });
    }
}