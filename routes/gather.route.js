const express = require('express');
const router = express();
const jsonParser = express.json();
const Employee = require("../models/Employee.model");

router.route('/gather')
    .get(async (req, res, next) => {
        res.render('gather', {
            title: "Команда СБОР",
            gatherList: await Employee.getGatherList(req.query.sortParam)
        });
    })
    .put(jsonParser, async (req, res, next) => {
        const result = await Employee.updateGatherInfo(req.body);
        res.json(result);
    })
    .delete(jsonParser, async (req, res, next) => {
        await Employee.clearGetherTime();
        res.json("true");
    })

module.exports = router;
