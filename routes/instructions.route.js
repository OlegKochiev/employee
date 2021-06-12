const express = require('express');
const router = express();
const jsonParser = express.json();
const Employee = require("../models/Employee.model");

router.route('/instructions')
    .get(async (req, res, next) => {            
        res.render('instructions', {
            title: "Инструкции по работе с программой"
        });
    })

module.exports = router;
