const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const database = require('../config/database');

user.post("/login", async (request, response, next) => {
    const { user_mail, user_pass } = request.body;

    const query = `SELECT * FROM users WHERE user_mail = '${user_mail}' AND user_pass = '${user_pass}';`;
    const rows = await database.query(query);
    console.log(rows);

    if(user_mail && user_pass){
        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return response.status(200).json({ code: 200, message: token });
        } else {
            return response.status(401).json({ code: 401, message: 'Usuario y/o contaseña incorrectos' });
        }
    }
    return response.status(500).json({ code: 500, message: "Campos incompletos" });
});

module.exports = user;//Añade al árbol de dependencias y lo trata como libreria para poder importarlo