import express, {Request, Response} from 'express';
import validator from 'validator';
import {RegisterUserDTO} from '../../interfaces/auth/RegisterUserDTO';
import {LoginUserDTO} from '../../interfaces/auth/LoginUserDTO';
import {IUser} from '../../interfaces/IUser';
import User from '../../models/user.model';
import {getHashedValue, validatePassword} from '../../utilities/bcrypt';
import Jwt from '../../utilities/jwt';
import Cookie from '../../utilities/cookie';
import ServerResponse from '../../utilities/serverResponse';

const router = express.Router();

/**
 * Register API
 *
 * @route    POST auth/register
 * @desc     Creates users
 * @access   Public
 */
router.route('/register').post(async (req: Request, res: Response) => {
    try {
        const user: RegisterUserDTO = req.body;
        const email = user.email;
        const password = user.password;
        const displayName = user.displayName;
        const dateTime = Math.floor(new Date().getTime() / 1000.0); //Epoch in milliseconds

        // Mongoose handles verifications and generates errors, although we want to handle this part
        if (!(validator.isEmail(email))) {
            return res.status(400).json(new ServerResponse('Invalid Email'));
        }

        if (!(password.length >= 7 && password.length <= 32)) {
            return res.status(400).json(new ServerResponse('Invalid Password Length'));
        }

        if (!(displayName.length >= 3 && displayName.length <= 18)) {
            return res.status(400).json(new ServerResponse('Invalid Display Length'));
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
            return res.status(201).json(new ServerResponse('Registered User'));
        } else {
            return res.status(400).json(new ServerResponse('Failed To Register User'));
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json(new ServerResponse(String(e)));
    }
});

/**
 * Login API
 *
 * @route    POST auth/login
 * @desc     Authenticates User
 * @access   Public
 */
router.route('/login').post(async (req: Request, res: Response) => {
    try {
        const user: LoginUserDTO = req.body;

        //@ts-ignore
        const userDb: IUser = await User.findOne({email: user.email});

        if (await validatePassword(user.password, userDb.password)) {
            const cookieWithJwt = new Cookie(await Jwt.generateJwt(userDb.email)).generateCookie();
            return res.setHeader('Set-Cookie', cookieWithJwt).status(202).json(new ServerResponse('Signed In'));
        } else {
            return res.status(403).json(new ServerResponse('Incorrect Email/Password'));
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

/**
 * Logout API
 *
 * @route    POST auth/logout
 * @desc     Expires the user's token
 * @access   Public
 */
router.route('/logout').get(async (req: Request, res: Response) => {
    try {
        const cookieWithJwt = new Cookie(await Jwt.expireJwt()).generateCookie();
        return res.setHeader('Set-Cookie', cookieWithJwt).status(200).json(new ServerResponse('Signed Out'));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

module.exports = router;
