import express, { Request, Response } from 'express';
import User from '../../models/user.model';
import {authenticateToken} from '../../middlewares/auth';
import {MomentsResponse} from '../../interfaces/MomentsResponse';

const router = express.Router();

router
    .route('/user')
    .get(authenticateToken, (req: Request, res: Response) => {
    });

module.exports = router;
