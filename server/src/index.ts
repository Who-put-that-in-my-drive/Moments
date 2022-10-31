import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_API || '';

mongoose.connect(uri).catch((err) => console.error(err));
mongoose.connection.once('open', () => {
    console.log('Database connection established.');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: '*',
    })
);

app.get('/', (req: Request, res: Response) => {
    console.log('Cookies: ', req.cookies);
    res.send({ message: 'Server Online!' });
});

app.use('/api', require('./routes/api'));

app.listen(port, () => {
    console.log(`Server started and bound to port ${port} successfully...🚀`);
});
