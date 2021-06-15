const mysql = require("mysql2/promise");
const config = require("../configs/EmployeeDB.config");

const Employee = function(employee) {
	this.name = employee.name;
	this.post = employee.post;
	this.rank = employee.rank;
	this.unit = employee.unit;
};

Employee.addEmployee = async (newEmployee) => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute("INSERT INTO `employees` (`name`,`post`,`rank`,`unit`, `gather_time`) VALUES (?, ?, ?, ?, '');", newEmployee);
		connection.end();
		return rows.insertId;
	} catch (error) {
		console.log("Error in method Employee.addEmployee in model: ", error);
	}
};
Employee.updateEmployee = async (employeeData, result) => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute("UPDATE `employees` SET `name` = ?, `post` = ?, `rank` = ?, `unit` = ? WHERE `id` = ?", 
			[employeeData[1], employeeData[2], employeeData[3], employeeData[4], employeeData[0]]);
		connection.end();
		return true;
	} catch (error) {
		console.log("Error in method Employee.updateEmployee in model: ", error);
	}
  };
Employee.deleteEmployee = async (employeeId) => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute("DELETE FROM `employees` WHERE `id` = ?", [Number(employeeId)]);
		connection.end();
		return true;
	} catch (error) {
		console.log("Error in method Employee.delEmployee in model: ", error);
	}
};
Employee.getEmployeesList = async (sortParam = 'name') => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute('SELECT `id`, `name`, `post`, `rank`, `unit` FROM `employees` ORDER BY `' + sortParam+ '`;');
		connection.end();
		return rows;
	} catch (error) {
		console.log("Error in Employee.getEmployeesList in model: ", error);
	}
  	
};
Employee.getTypeOfEmploymentList = async (sortParam = 'name') => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute("select `id`, `name`, `rank`, `unit`, `employment_type`, `time_interval_start`, `time_interval_end` from `employees` ORDER BY `unit`, `" + sortParam + "`;");
		connection.end();
		return rows;
	} catch (error) {
		console.log("Error in Employee.getTypeOfEmploymentList in model: ", error);
	}
}
Employee.updateTypeOfEmploymentList = async (typeOfEmploymentList) => {
	try {
		const connection = await mysql.createConnection(config);
		for (let employmentTypeData of typeOfEmploymentList) {
			await connection.execute("UPDATE `employees` SET `employment_type` = ?, `time_interval_start` = ?, `time_interval_end` = ? WHERE `id` = ?", 
			[employmentTypeData.employment_type, employmentTypeData.time_interval_start, employmentTypeData.time_interval_end, employmentTypeData.id]);
		}
		connection.end();
		return true;
	} catch (error) {
		console.log("Error in Employee.updateTypeOfEmploymentList in model: ", error);
	}
}
Employee.getGatherList = async (sortParam = "name") => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute("SELECT `id`, `name`, `rank`, `unit`, `gather_time`,`employment_type` FROM `employees` ORDER BY `" + sortParam + "`;");
		connection.end();
		return rows;
	} catch (error) {
		console.log("Error in Employee.getGatherList in model: ", error);
	}
}
Employee.clearGetherTime = async () => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute("UPDATE `employees` SET `gather_time` = ''");
		connection.end();
	} catch (error) {
		console.log("Error in Employee.getGatherList in model: ", error);
	}
}
Employee.updateGatherInfo = async (employeeData) => {
	try {
		const connection = await mysql.createConnection(config);
		await connection.execute("UPDATE `employees` SET `gather_time` = ? WHERE `id` = ?", 
		[employeeData.gatherTime, employeeData.id]);
		connection.end();
		return true;
	} catch (error) {
		console.log("Error in Employee.updateGatherInfo in model: ", error);
	}
}
Employee.getUnitsList = async () => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute("SELECT `id`, `unit_name` FROM `units`");
		connection.end();
		return rows;
	} catch (error) {
		console.log("Error in Employee.getUnitsList in model: ", error);
	}
}
Employee.addUnit = async (unitName) => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute("INSERT INTO `units` (`unit_name`) VALUES (?);", [unitName]);
		connection.end();
		return rows.insertId;
	} catch (error) {
		console.log("Error in Employee.addUnit in model: ", error);
	}
}
Employee.deleteUnit = async (unitID) => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute("DELETE FROM `units` WHERE `id` = ?", [unitID]);
		connection.end();
		return true;
	} catch (error) {
		console.log("Error in Employee.deleteUnit in model: ", error);
	}
}
Employee.getEmploymentCount = async (employmentType) => {
	try {
		const connection = await mysql.createConnection(config);
		const [rows, fields] = await connection.execute("SELECT COUNT(*) FROM `employees` WHERE `employment_type`=?", [employmentType]);
		connection.end();
		return rows[0]['COUNT(*)'];
	} catch (error) {
		console.log("Error in Employee.getEmploymentCount in model: ", error);
	}
}
Employee.getGatherCount = async (comeCheck) => {
	try {
		const connection = await mysql.createConnection(config);
		if (comeCheck) {
			const [rows, fields] = await connection.execute("SELECT COUNT(*) FROM `employees` WHERE `employment_type`='На лицо' AND `gather_time`!=''");
			connection.end();
			return rows[0]['COUNT(*)'];
		} else {
			const [rows, fields] = await connection.execute("SELECT COUNT(*) FROM `employees` WHERE `employment_type`='На лицо' AND `gather_time`=''");
			connection.end();
			return rows[0]['COUNT(*)'];
		}
	} catch (error) {
		console.log("Error in Employee.getGatherCount in model: ", error);
	}
}

module.exports = Employee;