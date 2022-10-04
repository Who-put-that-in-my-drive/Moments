import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors);
const port = process.env.PORT || 5000;

app.get('/api/test', (req, res) => {
    res.send('This is a test response!');
});

app.listen(port, () => {
    console.log('server started and bound to port successfully');
});
