import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/test', (req: Request, res: Response) => {
    res.send({message:'This is a message from server test route /api/test'});
});

module.exports = router;
