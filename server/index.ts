import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
// app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server Online!');
});

app.use('/api', require('./routes/index'));

app.listen(port, () => {
    console.log(`Server started and bound to port ${port} successfully...🚀`);
});
