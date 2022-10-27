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
        // Hashed Password Gets Stored Here
        password: {
            type: String,
            required: true,
            trim: true,
        },
        displayName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxLength: 18
        },
        firstName: {
            type: String,
            required: false,
            trim: true,
            minlength: 1,
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
        lastName: {
            type: String,
            required: false,
            trim: true,
            minlength: 1,
            maxLength: 18
        },
        createdDateTime: {
            type: Number,
            required: true,
        },
    }
);

const User = model<IUser>('User', userSchema);

export default User;
