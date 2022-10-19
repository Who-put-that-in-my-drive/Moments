import express, { Request, Response } from 'express';
import User from '../../../models/user.model';

const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const router = express.Router();

router.get('/test', auth, (req: Request, res: Response) => {
    res.json('This is a test message.');
});

// @route    POST api/auth/
// @desc     Authenticae user & get token aka login
// @access   Public
router.post('/', async (req: Request, res: Response) => {
    try {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const {email, password} = req.body;
        if(email === null || !expression.test(email) || password === null) {
            res.status(400).json({'message': 'user unauthorized'});
        }

        let user = await User.findOne({email});

        if(user === null || !user) {
            res.status(400).json({'message': 'user unauthorized'});
        }
        
        if(password !== user?.password) {
            res.status(400).json({'message': 'user unauthorized'});
        }

        const payload = {
            user: {
                id: user?.id,
                email: user?.email,
                displayName: user?.displayName
            }
        };

        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn: '5 days' },
            (err: any, token: string ) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        res.status(500).json('Server error');
    }

});


module.exports = router;
