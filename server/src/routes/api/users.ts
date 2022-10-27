import express, { Request, Response } from 'express';
import {authenticateToken} from '../../middlewares/auth';

const router = express.Router();

router
    .route('/user')
    .get(authenticateToken, (req: Request, res: Response) => {
    });

module.exports = router;
