import express, {Request, Response} from 'express';

import {authenticateToken} from '../../middlewares/auth';

const router = express.Router();

router
    .route('/')
    .get(authenticateToken, async (req: Request, res: Response) => {

    });

module.exports = router;