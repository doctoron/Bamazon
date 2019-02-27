//app.js
require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'bamazon'
});
connection.connect((err) => {
    if (err) throw err;
    connection.query("SELECT * FROM products WHERE item_id != NULL", function (err, result, fields) {
        if (err) throw err;
        console.log("Connection to bamazon_db successful!");
    });
});