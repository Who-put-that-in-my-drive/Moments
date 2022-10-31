import express, {Request, Response} from 'express';
import {authenticateToken} from '../../middlewares/auth';
import ServerResponse from '../../utilities/serverResponse';
import {UploadImageDTO} from '../../interfaces/image/UploadImageDTO';
import {UserModel} from '../../interfaces/auth/User';
import User from '../../models/user.model';
import Image from '../../models/image.model';
import {getCurrentDateTime} from '../../utilities/server';
import Jwt from '../../utilities/jwt';

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
                owner: email,
                location: uploadImageDTO.location,
                lastModifiedDateTime: dateTime,
                uploadedDateTime: dateTime,
            });

            if (await newImage.save()) {
                //@ts-ignore
                const user: UserModel = await User.findOneAndUpdate({email}, { $push: { images: newImage._id } } );

                if (user) {
                    return res.status(201).json(new ServerResponse('Image Uploaded Successfully'));
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
