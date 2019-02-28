const mysql = require('mysql');
const inquirer = require("inquirer");
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'bamazon'
});


let customer = require("./bamazonCustomer.js");
let manager = require("./bamazonManager.js");
let supervisor = require("./bamazonSupervisor.js");
let options = ["Customer", "Manager", "Supervisor", "Exit"];

let quit = () => {
  console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
  console.log("I hope you found this to be a *pleasant* fiction.  Come again soon.");
  console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
  process.exit();
};

let welcome = () => {
  console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");
  console.log("Welcome to Bamazon, your NUMBER ONE source for imaginary items at the dearest prices!\nAny sufficiently advanced technology is indistinguishable from magic.~ Arthur C. Clarke");
  console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");

  inquirer
    .prompt([
      {
        type: "list",
        choices: options,
        message: "Are you a Customer, Manager or Supervisor?",
        name: "login"
      }
    ])
    .then(function (res) {
      switch (res.login) {
        case options[0]:
          customer();
          break;
        case options[1]:
          manager();
          break;
        case options[2]:
          supervisor();
          break;
        default:
          quit();
          break;
      };
    });
  };

  module.exports = welcome;
  welcome();