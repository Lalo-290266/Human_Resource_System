const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'human_resources'
});

pool.query = util.promisify(pool.query);//Regresa promesas
module.exports = pool;