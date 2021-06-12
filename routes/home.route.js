const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const tokenKey = "dkmcde9dsnc39n3c";

router.route('/')
	.get((req, res, next) => {
		console.log(req.cookies.authorization);
		console.log(tokenKey);
		if (req.cookies.authorization) {
			jwt.verify(
				req.cookies.authorization.token.split(' ')[1],
				tokenKey,
				(err, payload) => {
					if (err) {
						res.redirect('/login');
					}
					console.log(payload);
				}
			)
			res.render('home', {
				title: "Домашняя страница"
			});
		}
		else 
			res.redirect('/login');
	})
module.exports = router;

