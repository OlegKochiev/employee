const express = require('express');
const router = express();
const jsonParser = express.json();
const Employee = require("../models/Employee.model");

router.route('/type_of_employment')
    .get(async (req, res, next) => {            
        res.render('type_of_employment', {
            title: "Редактировать расход личного состава",
            employeesList: await Employee.getTypeOfEmploymentList()
        });
    })
    .put(jsonParser, async (req, res, next) =>{
        const result = await Employee.updateTypeOfEmploymentList(req.body);
        res.json(result);
    })

module.exports = router;
