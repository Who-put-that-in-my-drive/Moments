import express, {Request, Response} from 'express';
import {authenticateToken} from '../../middlewares/auth';

const router = express.Router();

router
    .route('/photo')
    .get(authenticateToken, (req: Request, res: Response) => {
    })
    .post(authenticateToken, (req: Request, res: Response) => {
    })
    .put(authenticateToken, (req: Request, res: Response) => {
    })
    .delete(authenticateToken, (req: Request, res: Response) => {
    });

module.exports = router;