const express = require('express');
const jwt = require('jsonwebtoken');
const router = express();
const jsonParser = express.json();
const User = require("../models/User.model");

const tokenKey = "dkmcde9dsnc39n3c";

router.route('/login')
    .get(jsonParser, async (req, res, next) => {
        res.render('login', {
            title: "Авторизация"
        });
    })
    .post(jsonParser, async (req, res, next) => {
        const usernameVerify = await User.checkUserName(req.body.username);
        const passwordVerify = await User.checkUserPassword(req.body.password);
        if (usernameVerify && passwordVerify) {
            const userID = await User.getUserID(req.body.username);
            const userName = req.body.username;
            res
                .cookie(
                    'authorization', 
                    {
                        id: userID,
                        username: userName,
                        token: jwt.sign({ id: userID }, tokenKey)
                    })
                .redirect('/');
        } else {
            res.redirect('/login');
        }
    });

module.exports = router;
