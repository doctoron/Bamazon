const mysql = require('mysql');
const inquirer = require("inquirer");

let customer = require("./bamazonCustomer.js");
let manager = require("./bamazonManager");
let supervisor = require("./bamazonSupervisor");
let options = ["View Low Inventory", "View All Inventory", "Update Inventory", "Add New Product", "Return to Main Menu"];

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'FzvnXsF0iL53TX6L',
    // password: Process.env.DB_PASSWORD,
    database: 'bamazon'
});
con
nection.connect((err) => {
    if (err) throw err;
});


let quit = () => {
  console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
  console.log("I hope you found this to be a *pleasant* fiction.  Come again soon.");
  console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
  process.exit();