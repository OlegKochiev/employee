const express = require('express');
const jwt = require('jsonwebtoken');
const router = express();
const jsonParser = express.json();
const User = require("../models/User.model");

const tokenKey = "dkmcde9dsnc39n3c";

router.route('/auth')
    .get(jsonParser, async (req, res, next) => {
        res.render('auth', {
            title: "Авторизация"
        });
    })
    .post(jsonParser, async (req, res, next) => {
        console.log("req.body = ")
        console.log(req.body)
        const usernameVerify = await User.checkUserName(req.body.username);
        const passwordVerify = await User.checkUserPassword(req.body.password);
        if (usernameVerify && passwordVerify) {
            const userID = await User.getUserID(req.body.username);
            const userName = req.body.username;
            res.json({
                id: userID,
                username: userName,
                token: jwt.sign({ id: userID }, tokenKey)
            })
        } else {
            res.redirect('/auth');
        }
        //res.sendStatus(200);
    })
    .delete((req, res) => {
        res.clearCookie('authorization')
        res.json({
            "ok": "ok"
        })
    })

module.exports = router;
