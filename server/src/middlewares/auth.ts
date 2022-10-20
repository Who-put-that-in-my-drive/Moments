import * as jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import Jwt from '../utilities/jwt';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = await Jwt.getAccessTokenCookie(req);

        if (accessToken == null || accessToken === '') return res.sendStatus(401);

        jwt.verify(accessToken, process.env.JWT_SECRET as string, (err: any, user: any) => {
            if (err) return res.sendStatus(403);

            //@ts-ignore - Required since email key does not exist in express' 'Request' interface
            req.email = user.sub;

            next();
        });
    } catch (e) {
        return res.sendStatus(500);
    }
};
