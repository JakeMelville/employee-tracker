const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 3306, 
    user: 'root',
    password: 'password',
    database: 'employeeDB'
});


connection.connect((err) => {
    if (err) throw err;
    console.log('connected to server')
});
connection.query = util.promisify(connection.query);


module.exports = connection;
