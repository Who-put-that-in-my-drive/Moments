const express = require('express');

const app = express();
const port = 3001;

app.get('/test', (req, res)=> {
    console.log('+1');
    res.send({data:'This is a message from server'});
});

app.listen(port, ()=> {
    console.log(`server started on port ${port}`);
});