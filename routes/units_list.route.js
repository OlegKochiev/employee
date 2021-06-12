const express = require('express');
const router = express();
const jsonParser = express.json();
const Employee = require("../models/Employee.model");

router.route('/units_list')
    .get(async (req, res, next) => {            
        res.render('units_list', {
            title: "Редактировать список подразделений",
            unitsList: await Employee.getUnitsList()
        });
    })
    .post(jsonParser, async (req, res, next) =>{
        const newUnitID = await Employee.addUnit(req.body.unitName);
        res.json(newUnitID);
    })
    .delete(jsonParser, async (req, res, next) =>{
        const result = await Employee.deleteUnit(req.body.id);
        res.json(result);
    })

module.exports = router;
