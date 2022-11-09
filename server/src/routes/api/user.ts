import express, { Request, Response } from 'express';

import {authenticateToken} from '../../middlewares/auth';
import User from '../../models/user.model';
import {getEmail} from '../../utilities/server';
import {UserModel} from '../../interfaces/auth/User';
import {SanitizedUser} from '../../interfaces/auth/SanitizedUser';
import ServerResponse from '../../utilities/serverResponse';
import {UpdateUserDTO} from '../../interfaces/user/UpdateUserDTO';
import validator from 'validator';
import Jwt from '../../utilities/jwt';
import Cookie from '../../utilities/cookie';

const router = express.Router();

router
    .route('/')
    .get(authenticateToken, async (req: Request, res: Response) => {
        try {
            const userDb = await User.findOne({email: getEmail(req)});
            if (userDb) {
                //@ts-ignore
                const user: UserModel = userDb._doc;
                const sanitizedUser: SanitizedUser = {...user};
                delete sanitizedUser.password;
                return res.status(200).json(new ServerResponse('User Retrieved').setData({user: sanitizedUser}));
            } else {
                return res.status(404).json(new ServerResponse('User Not Found'));
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json(new ServerResponse(String(e)));
        }
    }).put(authenticateToken, async (req: Request, res: Response) => {
        try {
            const userDb = await User.findOne({email: getEmail(req)});

            if (userDb) {
                // @ts-ignore
                const user: UserModel = userDb._doc;

                const updateUserDTO: UpdateUserDTO = req.body;
                const updatedEmail = updateUserDTO.email.toString();
                const updatedDisplayName = updateUserDTO.displayName.toString();
                const firstName = updateUserDTO.firstName;
                const lastName = updateUserDTO.lastName;

                if (user.email !== updatedEmail) {
                    if (!(validator.isEmail(updatedEmail))) {
                        return res.status(400).json(new ServerResponse('Invalid Email'));
                    }
                    if (await User.exists({email: updatedEmail})) {
                        return res.status(400).json(new ServerResponse('Email Already In Use'));
                    }
                }

                if (user.displayName !== updatedDisplayName) {
                    if (!(updatedDisplayName.length >= 3 && updatedDisplayName.length <= 18)) {
                        return res.status(400).json(new ServerResponse('Invalid Display Length'));
                    }

                    if (await User.exists({display: updatedDisplayName})) {
                        return res.status(400).json(new ServerResponse('Display Name Already In Use'));
                    }
                }

                if (user.firstName !== firstName) {
                    if (!(firstName.length >= 1 && firstName.length <= 18)) {
                        return res.status(400).json(new ServerResponse('Under/Exceeds Character Length'));
                    }
                }

                if (user.lastName !== lastName) {
                    if (!(lastName.length >= 1 && lastName.length <= 18)) {
                        return res.status(400).json(new ServerResponse('Under/Exceeds Character Length'));
                    }
                }

                if (await User.findOneAndUpdate({email: getEmail(req)}, {...updateUserDTO})) {
                    const cookieWithJwt = new Cookie(await Jwt.generateJwt(updatedEmail)).generateCookie();
                    return res.setHeader('Set-Cookie', cookieWithJwt).status(200).json(new ServerResponse('User Updated'));
                } else {
                    return res.status(500).json(new ServerResponse('Server Error'));
                }
            } else {
                return res.status(404).json(new ServerResponse('User Not Found'));
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json(new ServerResponse(String(e)));
        }
    }).delete(authenticateToken, async (req: Request, res: Response) => {
        try {
            if (await User.findOneAndDelete({email: getEmail(req)})) {
                const cookieWithJwt = new Cookie(Jwt.expireJwt()).generateCookie();
                return res.setHeader('Set-Cookie', cookieWithJwt).status(200).json(new ServerResponse('User Deleted'));
            } else {
                return res.status(404).json(new ServerResponse('User Not Found'));
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json(new ServerResponse(String(e)));
        }
    });

module.exports = router;
