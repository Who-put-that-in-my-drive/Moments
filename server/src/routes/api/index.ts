import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/test', (req: Request, res: Response) => {
    res.json('This is a test message.');
});

router.use('/users', require('./users'));

module.exports = router;
