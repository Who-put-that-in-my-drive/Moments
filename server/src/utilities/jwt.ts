import {Request} from 'express';
import * as jwt from 'jsonwebtoken';

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
                secret,
                {
                    expiresIn: '1h'
                }
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
