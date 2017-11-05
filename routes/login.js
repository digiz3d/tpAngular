const express = require('express');
const router = express.Router();
const randomstring = require("randomstring");
const mysql = require('mysql');
const bCryt = require('bCrypt');

router.post('/', function (req, res) {
    //new connection
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'Banque'
    });

    //Open connection
    connection.connect();

    //Check if password match
    connection.query('select login, password from Users where login = "' + req.body.login + '"', function (err, rows, fields) {
        if (err) {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (rows.length > 0) {
                //Compare passwords with bCrypt
                bCryt.compare(req.body.password, rows[0].password, function (errorBCrypt, resultBCryt) {
                    if (errorBCrypt) {
                        //not connected
                        res.send({
                            "code": 403,
                            "success": "An error has occured"
                        });
                    }
                    else {
                        if (resultBCryt) {
                            //Connected
                            res.send({
                                "code": 200,
                                "success": "login sucessfull"
                            });
                        }
                        else {
                            //Non result
                            res.send({
                                "code": 403,
                                "success": "Bad password"
                            });
                        }
                    }
                })
            }
            else {
                res.send({
                    "code": 403,
                    "success": "Bad password"
                });
            }
        }
    });

    //Close connection
    connection.end();

    /*res.send({
        'status': "OK",
        'token': randomstring.generate(64),
        'body': req.body
    });*/
});

module.exports = router;