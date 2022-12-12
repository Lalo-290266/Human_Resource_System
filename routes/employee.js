const express = require('express');
const employee = express.Router();
const database = require('../config/database');

employee.post("/", async (request, response, next) => {//Agregar registros
    //Deconstruyendo el formato json
    const { emp_name, emp_lastname, emp_mail, emp_phone, emp_address } = request.body;

    if (emp_name && emp_lastname && emp_mail && emp_phone && emp_address) {//Validacion de campos
        let query = "INSERT INTO `employees`(`emp_name`, `emp_lastname`, `emp_mail`, `emp_phone`, `emp_address`)";
        query += ` VALUES ('${emp_name}', '${emp_lastname}', '${emp_mail}', ${emp_phone}, '${emp_address}')`;
        const rows = await database.query(query);//Realiza la consulta en la base de datos

        if (rows.affectedRows == 1) {
            return response.status(201).json({ code: 201, message: "Regisgtro agregado correctamente" });
        }

        return response.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return response.status(500).json({ code: 500, message: "Campos incompletos" });
});

employee.delete("/:id([0-9]{1,3})", async (request, response, next) => {//Emilinar registros
    const query = `DELETE FROM employees WHERE emp_id = ${request.params.id}`;
    const rows = await database.query(query);

    if (rows.affectedRows == 1) {
        return response.status(200).json({ code: 200, message: "Registro borrado correctamente" });
    }

    response.status(404).json({
        code: 404,
        message: "Registro no encontrado"
    });
});

employee.put("/:id([0-9]{1,3})", async (request, response, next) => {//Modificar registros
    const { emp_name, emp_lastname, emp_mail, emp_phone, emp_address } = request.body;

    if (emp_name && emp_lastname && emp_mail && emp_phone && emp_address) {
        let query = `UPDATE employees SET emp_name='${emp_name}', emp_lastname='${emp_lastname}',`;
        query += `emp_mail='${emp_mail}', emp_phone=${emp_phone}, emp_address='${emp_address}' WHERE emp_id=${request.params.id}`;
        const rows = await database.query(query);

        if (rows.affectedRows == 1) {
            return response.status(200).json({ code: 200, message: "Registro actualizado correctamente" });
        }

        return response.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return response.status(500).json({ code: 500, message: "Campos incompletos" });
});

employee.patch("/:id([0-9]{1,3})", async (request, response, next) => {//Duda de implementacion

    if (request.body.emp_name) {
        let query = `UPDATE employees SET emp_name='${request.body.emp_name}' WHERE emp_id=${request.params.id}`;
        const rows = await database.query(query);

        if (rows.affectedRows == 1) {
            return response.status(200).json({ code: 200, message: "Registro modificado correctamente" });
        }

        return response.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return response.status(500).json({ code: 500, message: "Campos incompletos" });
});

employee.get("/", async (request, response, next) => {//Consultar registros
    const consulta = await database.query("SELECT * FROM employees");
    return response.status(200).json({ code: 200, message: consulta });
});

employee.get("/:name([A-Za-z]+)", async (request, response, next) => {//Consulta por nombre
    const registros = await database.query("SELECT * FROM employees");
    const name = request.params.name;

    const retorno = registros.filter((element) => {
        return (element.emp_name.toLowerCase() == name.toLowerCase()) && element;
    });

    (retorno.length != 0) ?
        response.status(200).json({ code: 200, message: retorno }) :
        response.status(404).json({ code: 404, message: "Registro no encontrado" });
});

module.exports = employee;