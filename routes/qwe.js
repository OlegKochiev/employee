const jwt = require('jsonwebtoken');
const tokenKey = require('../configs/UserDB.config').tokenKey;

function checkUser(req, res, next) {
	if (req.cookies.authorization) {
		jwt.verify(
			req.cookies.authorization.token.split(' ')[1],
			tokenKey,
			(err, payload) => {
				if (err) next()
				else if (payload) {
					const user = {
						id: payload.id,
						username: payload.username
					}
					req.user = user;
					next();
				}
			}
	  )
	}
	next();
}
module.exports = checkUser;