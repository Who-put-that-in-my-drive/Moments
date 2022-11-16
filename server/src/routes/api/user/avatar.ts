import express, {Request, Response} from 'express';
import {authenticateToken} from '../../../middlewares/auth';
import ServerResponse from '../../../utilities/serverResponse';
import {GetObjectCommand, PutObjectCommand} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {s3Client} from '../../../utilities/s3Client';
import {getEmail} from '../../../utilities/server';

const myBucket = 'moments-gallery'; // Moments Bucket
const signedUrlExpireSeconds = 300; // 5 Minutes

const router = express.Router();

router
    .route('/')
    .get(authenticateToken, async (req: Request, res: Response) => {
        try {
            const command = new GetObjectCommand({
                Bucket: myBucket,
                Key: `${getEmail(req)}/avatar.png`,
            });

            const presignedUrl = await getSignedUrl(s3Client, command, {
                expiresIn: signedUrlExpireSeconds
            });

            return res.status(200).json(new ServerResponse('Avatar Data Retrieved').setData({presignedUrl}));
        } catch (e) {
            console.error(e);
            return res.status(500).json(new ServerResponse(String(e)));
        }
    })
    .put(authenticateToken, async (req: Request, res: Response) => {
        try {
            const command = new PutObjectCommand({
                Bucket: myBucket,
                Key: `${getEmail(req)}/avatar.png`,
            });

            const presignedUrl = await getSignedUrl(s3Client, command, {
                expiresIn: signedUrlExpireSeconds
            });

            return res.status(200).json(new ServerResponse('Avatar Data Retrieved').setData({presignedUrl}));
        } catch (e) {
            console.error(e);
            return res.status(500).json(new ServerResponse(String(e)));
        }
    });

module.exports = router;
