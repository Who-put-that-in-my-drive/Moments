import { Schema, model } from 'mongoose';

interface IUser {
  email: String;
  password: String;
  displayName: String;
  images?: [String];
  lastLoginDateTime?: Number;
  createdDateTime?: Number;
}

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
        },
        displayName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        images: {
            type: [String],
        },
        lastLoginDate: {
            type: Number,
            required: false,
        },
        createdDateTime: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>('User', userSchema);
export default User;
