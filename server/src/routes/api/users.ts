import express, { Request, Response } from 'express';
import { request } from 'http';
import User from '../../../models/user.model';

const jwt = require('jsonwebtoken');
const router = express.Router();

router.route('/').get((req: Request, res: Response) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json(err));
});

// @route    POST api/users
// @desc     Register user
// @access   Public
router.route('/').post((req: Request, res: Response) => {
    const newUser = new User({
        email: String(req.body.email),
        password: String(req.body.password),
        displayName: String(req.body.displayName),
        images: req.body.images || [],
    });
    
    newUser
        .save()
        .then((user) => {
            const payload = {
                user: {
                    id: user.id,
                    email: user.email,
                    displayName: user.displayName
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
        })
        .catch((err) => res.status(400).json(err));
});


router
    // @route    POST api/users/:id
    // @desc     Find user by id
    // @access   Public
    .route('/:id')
    .get((req: Request, res: Response) => {
        User.findById({ _id: req.params.id })
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    })

    // @route    Delete api/users/:id
    // @desc     delete user by id
    // @access   Privaye
    .delete((req: Request, res: Response) => {
        User.findByIdAndDelete({ _id: req.params.id })
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    })

    // @route    Update api/users/:id
    // @desc     Update user by id
    // @access   Privaye
    .put((req: Request, res: Response) => {
        User.findById({ _id: req.params.id })
            .then(() => {
                const updatedUser = new User({
                    email: String(req.body.email),
                    password: String(req.body.password),
                    displayName: String(req.body.displayName),
                    images: req.body.images || [],
                });

                updatedUser
                    ?.save()
                    .then((update) => res.json(update))
                    .catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(400).json(err));
    })
    .patch((req: Request, res: Response) => {
        User.findById({ _id: req.params.id }).then((user) => {
            if (user) {
                if (req.body.email !== undefined) user.email = req.body.email;
                if (req.body.password !== undefined) user.password = req.body.password;
                if (req.body.displayName !== undefined)
                    user.displayName = req.body.displayName;
                if (req.body.images !== undefined) user.images = req.body.images;
                if (req.body.lastLoginDateTime !== undefined)
                    user.lastLoginDateTime = req.body.lastLoginDateTime;
                user
                    .save()
                    .then((user) => res.json(user))
                    .catch((err) => res.status(400).json(err));
            } else res.status(400).json(null);
        });
    });

module.exports = router;
