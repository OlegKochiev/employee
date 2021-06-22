const express = require('express');
const router = express();

router.route('/')
	.get((req, res, next) => {
		res.render('home', {
			title: "Домашняя страница"
		});
	})
module.exports = router;

