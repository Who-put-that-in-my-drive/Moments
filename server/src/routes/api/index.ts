import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
    res.json('Server is up & running...');
});

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));

module.exports = router;
