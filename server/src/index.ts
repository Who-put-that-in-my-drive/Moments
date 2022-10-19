import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../dev.env') });

const app = express();
const port = process.env.PORT || 8000;
const uri = process.env.MONGO_API;

mongoose.connect(uri).catch((err) => console.error(err));
mongoose.connection.once('open', () => {
    console.log('Database connection established.');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: '*',
    })
);

app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'Server Online!' });
});

app.use('/api', require('./routes/api'));

app.listen(port, () => {
    console.log(`Server started and bound to port ${port} successfully...🚀`);
});
