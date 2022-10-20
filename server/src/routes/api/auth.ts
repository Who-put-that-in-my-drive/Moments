import express, {Request, Response} from 'express';
import validator from 'validator';
import {RegisterUserDTO} from '../../../interfaces/auth/RegisterUserDTO';
import {LoginUserDTO} from '../../../interfaces/auth/LoginUserDTO';
import {IUser} from '../../../interfaces/IUser';
import User from '../../models/user.model';
import {getHashedValue, validatePassword} from '../../utilities/bcrypt';
import Jwt from '../../utilities/jwt';
import Cookie from '../../utilities/cookie';

const router = express.Router();

router.route('/register').post(async (req: Request, res: Response) => {
    try {
        const user: RegisterUserDTO = req.body;
        const email = user.email;
        const password = user.password;
        const displayName = user.displayName;
        const dateTime = Math.floor(new Date().getTime() / 1000.0); //Epoch in milliseconds

        if (!(validator.isEmail(email))) {
            return res.status(400).json('Invalid Email');
        }

        if (!(password.length >= 7 && password.length <= 32)) {
            return res.status(400).json('Invalid Password Length');
        }

        if (!(displayName.length >= 3 && displayName.length <= 18)) {
            return res.status(400).json('Invalid Display Length');
        }

        const hashedPassword = await getHashedValue(user.password);

        const newUser = new User({
            email,
            password: hashedPassword,
            displayName,
            images: [],
            lastLoginDateTime: dateTime,
            createdDateTime: dateTime
        });

        if (await newUser.save()) {
            return res.status(201).json('Registered User');
        } else {
            return res.status(400).json('Failed To Register User');
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
});

router.route('/login').post(async (req: Request, res: Response) => {
    try {
        const user: LoginUserDTO = req.body;

        //@ts-ignore
        const userDb: IUser = await User.findOne({email: user.email});

        if (await validatePassword(user.password, userDb.password)) {
            const cookieWithJwt = new Cookie(await Jwt.generateJwt(userDb.email)).generateCookie();
            return res.setHeader('Set-Cookie', cookieWithJwt).status(202).json('Signed In');
        } else {
            return res.status(403).json('Incorrect Password');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.route('/logout').get(async (req: Request, res: Response) => {
    try {
        const cookieWithJwt = new Cookie(await Jwt.expireJwt()).generateCookie();
        return res.setHeader('Set-Cookie', cookieWithJwt).status(200).json('Signed Out');
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

module.exports = router;
