import express, {Request, Response} from 'express';
import {authenticateToken} from '../../middlewares/auth';
import ServerResponse from '../../utilities/serverResponse';
import {UploadImageDTO} from '../../interfaces/image/UploadImageDTO';
import {UserModel} from '../../interfaces/auth/User';
import User from '../../models/user.model';
import Image from '../../models/image.model';
import {getCurrentDateTime} from '../../utilities/server';
import AWS from 'aws-sdk';
import {ImageModel} from '../../interfaces/image/Image';
import { s3Client } from '../../utilities/s3Client';
import {
    CreateBucketCommand,
    DeleteObjectCommand,
    PutObjectCommand,
    DeleteBucketCommand, GetObjectCommand
}
    from '@aws-sdk/client-s3';
// @ts-ignore
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

AWS.config.update({accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY});
AWS.config.update({region: 'us-east-1'});
const s3: AWS.S3 = new AWS.S3();

const myBucket = 'moments-gallery'; // Moments Bucket
const signedUrlExpireSeconds = 3600; // 1 hour

const router = express.Router();

router
    .route('/')
    .get(authenticateToken, async (req: Request, res: Response) => {
        try {
            const imageId = req.query.imageId;
            if (imageId  == null) {
                return res.status(400).json(new ServerResponse('Bad Request'));
            }

            // @ts-ignore
            const email = req.email;
            // @ts-ignore
            const user: UserModel = await User.findOne({email});

            // @ts-ignore
            if (user.images.get(imageId) == null) {
                return res.status(400).json(new ServerResponse('Bad Request'));
            }

            // @ts-ignore
            const image: ImageModel = await Image.findOne({_id: imageId});

            if (image) {
                // Create the command.
                const command = new GetObjectCommand({
                    Bucket: myBucket,
                    Key: `${email}/${imageId}.${image.format}`,
                });

                // Create the presigned URL.
                const presignedUrl = await getSignedUrl(s3Client, command, {
                    expiresIn: signedUrlExpireSeconds,
                });

                return res.status(200).json(new ServerResponse('Image Data Retrieved').setData({presignedUrl}).addData({image}));
            } else {
                return res.status(400).json(new ServerResponse('Bad Request'));
            }
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
                format: uploadImageDTO.format,
                size: uploadImageDTO.size,
                caption: uploadImageDTO.caption,
                tags: uploadImageDTO.tags,
                categories: uploadImageDTO.categories,
                location: uploadImageDTO.location || 'N/A',
                lastModifiedDateTime: dateTime,
                uploadedDateTime: dateTime,
            });

            const imageId = newImage._id.toString();

            if (await newImage.save()) {
                // @ts-ignore
                const user: UserModel = await User.findOneAndUpdate({email}, { '$set': { images: {[imageId]: imageId } } });

                const command = new PutObjectCommand({
                    Bucket: myBucket,
                    Key: `${email}/${imageId}.${uploadImageDTO.format}`,
                });

                const presignedUrl = await getSignedUrl(s3Client, command, {
                    expiresIn: signedUrlExpireSeconds
                });

                if (user) {
                    return res.status(201).json(new ServerResponse('Image Uploaded Successfully').setData({presignedUrl}));
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
