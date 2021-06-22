const express = require('express');
const router = express();
const jsonParser = express.json();
const Employee = require("../models/Employee.model");

router.route('/gather')
    .get(async (req, res, next) => {
        let employmentCount = {
            onfaceCount: await Employee.getEmploymentCount('На лицо'),
            watchCount: await Employee.getEmploymentCount('В наряде'),
            patientCount: await Employee.getEmploymentCount('Болен'),
            holidayCount: await Employee.getEmploymentCount('Отпуск'),
            missionCount: await Employee.getEmploymentCount('Командировка'),
            come: await Employee.getGatherCount(true),
            noCome: await Employee.getGatherCount(false)
        }
        res.render('gather', {
            title: "Команда СБОР",
            gatherList: await Employee.getGatherList(req.query.sortParam),
            employmentCount: employmentCount
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
