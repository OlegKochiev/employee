const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const tokenKey = require('./configs/UserDB.config').tokenKey;

const loginRoute = require('./routes/login.route');
const homeRoute = require('./routes/home.route');
const listEmployeesRoute = require('./routes/list_employees.route');
const gatherRoute = require('./routes/gather.route');
const typeOfEmploymentRoute = require('./routes/type_of_employment.route');
const unitsListRoute = require('./routes/units_list.route');
const instructionsRoute = require('./routes/instructions.route');
const port = 3000;


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));



app.use(loginRoute);
app.use(homeRoute);
app.use(listEmployeesRoute);
app.use(gatherRoute);
app.use(typeOfEmploymentRoute);
app.use(unitsListRoute);
app.use(instructionsRoute);


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})
