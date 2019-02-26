//app.js
// require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'FzvnXsF0iL53TX6L',
    // password: Process.env.DB_PASSWORD,
    database: 'bamazon'
});
connection.connect((err) => {
    if (err) throw err;
connection.query("SELECT product_name, price, stock_quantity FROM products WHERE item_id = 7", function (err, result, fields) {
    // connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});
