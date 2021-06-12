const express = require('express');
const router = express();
const jsonParser = express.json();
const Employee = require("../models/Employee.model");

router.route('/list_employees')
    .get(async (req, res, next) => {  
        res.render('list_employees', {
            title: "Редактировать список работников",
            employeesList: await Employee.getEmployeesList(req.query.sortParam),
            unitsList: await Employee.getUnitsList()
        });
    })
    .post(jsonParser, async (req, res, next) => {
        const newEmployeeId = await Employee.addEmployee(req.body);
        res.json(newEmployeeId);
    })
    .put(jsonParser, async (req, res, next) =>{
        const result = await Employee.updateEmployee(req.body);
        res.json(result);
    })
    .delete(jsonParser, async (req, res, next) => {
        const result = await Employee.deleteEmployee(req.body.id);
        res.json(result);
    });

module.exports = router;
