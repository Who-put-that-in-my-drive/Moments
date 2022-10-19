import express, {Request, Response} from 'express';
import validator from 'validator';
import User from '../../../models/user.model';
import {RegisterUserDTO} from '../../../interfaces/auth/RegisterUserDTO';
import {getHashedValue, validatePassword} from '../../../utilities/bcrypt';
import {LoginUserDTO} from '../../../interfaces/auth/LoginUserDTO';
import {IUser} from '../../../interfaces/IUser';

const router = express.Router();

router.route('/register').post(async (req: Request, res: Response) => {
    try {
        const user: RegisterUserDTO = req.body;
        const email = user.email;
        const dateTime = Math.floor(new Date().getTime() / 1000.0); //Epoch in milliseconds

        if (!(validator.isEmail(email))) {
            return res.status(400).json('Invalid Email');
        }

        const password = await getHashedValue(user.password);

        const newUser = new User({
            email,
            password: password,
            displayName: user.displayName,
            images: [],
            lastLoginDateTime: dateTime,
            createdDateTime: dateTime
        });

        return newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
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
            console.log('Success');
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

module.exports = router;
