const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'newageFORMAT19!*',
    database: 'employee_tracker_db'
});

module.exports = connection;