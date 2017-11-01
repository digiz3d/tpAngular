const express = require('express');
const router = express.Router();
const randomstring = require("randomstring");

router.post('/', function(req, res){
    res.send({
        'status': "OK",
        'token' : randomstring.generate(64),
        'body': req.body
    });
});

module.exports = router;