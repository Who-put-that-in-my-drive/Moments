import { Schema, model } from 'mongoose';
import {IUser} from '../interfaces/IUser';

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxLength: 32
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            maxLength: 32
        },
        displayName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxLength: 18
        },
        images: {
            type: [String],
            required: true
        },
        lastLoginDateTime: {
            type: Number,
            required: true,
        },
        createdDateTime: {
            type: Number,
            required: true,
        },
    }
);

const User = model<IUser>('User', userSchema);

export default User;
