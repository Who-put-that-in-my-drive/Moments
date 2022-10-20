import * as jwt from 'jsonwebtoken';

const secret = String(process.env.JWT_SECRET);

export default class JwtUtils {
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
}
