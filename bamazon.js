const mysql = require('mysql');
const inquirer = require("inquirer");

let customer = require("./bamazonCustomer.js");
let manager = require("./bamazonManager");
let supervisor = require("./bamazonSupervisor");
let options = ["Customer", "Manager", "Supervisor", "Exit"];

let quit = () => {
  console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
  console.log("I hope you found this to be a *pleasant* fiction.  Come again soon.");
  console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
  process.exit();
};

let welcome = () => {
  console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");
  console.log("Welcome to Bamazon, your NUMBER ONE source for imaginary items at the dearest prices!\nWe won't be beat... nobodys price is higher!");
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