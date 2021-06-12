const mysql = require("mysql2/promise");
const userDBConfig= require("../configs/UserDB.config").dbConfig;

const User = function () {
};

User.getUserID = async (username) => {
	try {
		const connection = await mysql.createConnection(userDBConfig);
		const [rows, fields] = await connection.execute('SELECT `id` FROM `users` WHERE `username` = ?;', [username]);
		connection.end();
		return rows[0].id;
	} catch (error) {
		console.log("Error in method User.getUserID in model: ", error);
	}
};
User.checkUserName = async (username) => {
	try {
		const connection = await mysql.createConnection(userDBConfig);
		const [rows, fields] = await connection.execute('SELECT * FROM `users` WHERE `username` = ?;', [username]);
		connection.end();
		if (rows.length != 0) {
			return true;
		}
		else {
			return false;
		}
	} catch (error) {
		console.log("Error in method User.checkUserName in model: ", error);
	}
}
User.checkUserPassword = async (password) => {
	try {
		const connection = await mysql.createConnection(userDBConfig);
		const [rows, fields] = await connection.execute("SELECT * FROM `users` WHERE `password` = ?;", [password]);
		connection.end();
		if (rows.length != 0) {
			return true;
		}
		else {
			return false;
		}
	} catch (error) {
		console.log("Error in method User.checkUserPassword in model: ", error);
	}
}
module.exports = User;