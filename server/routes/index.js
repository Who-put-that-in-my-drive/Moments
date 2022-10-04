const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send({message:'This is a message from server test route /api/test'});
});

module.exports = router;
