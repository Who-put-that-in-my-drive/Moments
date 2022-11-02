import express, {Request, Response} from 'express';
import {authenticateToken} from '../../middlewares/auth';
import ServerResponse from '../../utilities/serverResponse';
import {UploadImageDTO} from '../../interfaces/image/UploadImageDTO';
import {UserModel} from '../../interfaces/auth/User';
import User from '../../models/user.model';
import Image from '../../models/image.model';
import {getCurrentDateTime} from '../../utilities/server';
import AWS from 'aws-sdk';

const s3: AWS.S3 = new AWS.S3();
AWS.config.update({accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY});

const myBucket = 'moments-gallery'; // Moments Bucket
const signedUrlExpireSeconds = 60 * 5; // 5 Minutes

const router = express.Router();

router
    .route('/')
    .get(authenticateToken, (req: Request, res: Response) => {
        try {
        } catch (e) {
            console.error(e);
            return res.status(500).json(new ServerResponse(String(e)));
        }
    })
    .post(authenticateToken, async (req: Request, res: Response) => {
        try {
            const uploadImageDTO: UploadImageDTO = req.body;
            // @ts-ignore
            const email = req.email;
            const dateTime = getCurrentDateTime();

            const newImage = new Image({
                title: uploadImageDTO.title,
                size: uploadImageDTO.size,
                caption: uploadImageDTO.caption,
                tags: uploadImageDTO.tags,
                categories: uploadImageDTO.categories,
                location: uploadImageDTO.location || 'N/A',
                lastModifiedDateTime: dateTime,
                uploadedDateTime: dateTime,
            });

            if (await newImage.save()) {
                // @ts-ignore
                const user: UserModel = await User.findOneAndUpdate({email}, { $push: { images: newImage._id } } );

                const presignedUrl = s3.getSignedUrl('getObject', {
                    Bucket: myBucket,
                    Key: `${email}/${newImage._id}`,
                    Expires: signedUrlExpireSeconds
                });

                if (user) {
                    return res.status(201).json(new ServerResponse('Image Uploaded Successfully').setData({presignedUrl: presignedUrl}));
                } else {
                    return res.status(502).json(new ServerResponse('Uh oh something went wrong :('));
                }
            } else {
                return res.status(400).json(new ServerResponse('Bad Request'));
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json(new ServerResponse(String(e)));
        }
    })
    .put(authenticateToken, (req: Request, res: Response) => {
        try {
        } catch (e) {
            console.error(e);
            return res.status(500).json(new ServerResponse(String(e)));
        }
    })
    .delete(authenticateToken, (req: Request, res: Response) => {
        try {
        } catch (e) {
            console.error(e);
            return res.status(500).json(new ServerResponse(String(e)));
        }
    });

module.exports = router;
