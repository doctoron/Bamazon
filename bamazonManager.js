require('dotenv').config();
const mysql = require('mysql');
const inquirer = require("inquirer");
const Table = require("easy-table");
let username = "test";
let mgrPass = "justatest";
// let customer = require("./bamazonCustomer.js");
// // let manager = require("./bamazonManager.js");
// // let supervisor = require("./bamazonSupervisor.js");

let options = ["View Low Inventory", "View All Inventory", "Update Inventory", "Add New Product", "Return to Main Menu"];
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'bamazon'
});

connection.connect((err) => {
    if (err) throw err;
});

let login = ()=> {
    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
    console.log("Confirm email/login and password");
    inquirer.prompt([
        {
            type: "confirm",
            message: "Is this correct? \n",
            name: "islogin"
        }
    ]).then(function (res) {
        if (res.islogin)
            inquirer.prompt([
                {
                    type: "input",
                    message: "Username:",
                    name: "username"
                },
                {
                    type: "password",
                    message: "Password:",
                    name: "mgrPass"
                }
            ]).then(function (res) {
                if (res.username === username && res.password === mgrPass) {
                    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
                    console.log("Welcome 'Test' to Manager Access.");
                    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
                    manager();
                }
                else {
                    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
                    console.log("Invalid username/email or password.");
                    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
                    login();
                }
            });
        //     } else {
        //     let welcome = require("./bamazon.js");
            welcome();
        // }
        // });

        let manager=()=> {
            inquirer.prompt([
                {
                    type: "list",
                    choices: options,
                    name: "options",
                    message: "What is thy bidding?"
                }
            ]).then(function (res) {
                switch (res, options) {
                    case options[0]:
                        viewLow();
                        break;
                    case options[1]:
                        viewAll();
                        break;
                    case options[2]:
                        updateInv();
                        break;
                    case options[3]:
                        addNew();
                        break;
                    default:
                        welcome();
                        break;
                }
            });
        };

        let viewLow = () => {
            inquirer.prompt([
                {
                    type: "list",
                    message: "\nSort by: ",
                    choices: ["Department", "Price (Ascending)", "Price (Descending)"],
                    name: "options"
                }
            ]).then(function (res) {
                switch (res.options) {
                    case "Price (Ascending)":
                        connection.query("SELECT * FROM products ORDER BY price",
                            function (err, results) {
                                if (err) throw err;
                                console.log("/n" + Table.print(results, {
                                    item_id: { name: "Product ID" },
                                    product_name: { name: "Product Name" },
                                    department_name: { name: "Department" },
                                    price: {
                                        name: "Price ($)",
                                        printer: Table.number(2)
                                    },
                                    stock_quantity: { name: "Stock Quantity" },
                                    cost: { name: "Unit Cost" }
                                })
                                );
                                manager();
                            });
                        break;
                    case "Price (Descending)":
                        connection.query("SELECT * FROM products ORDER BY price DESC",
                            function (err, results) {
                                if (err) throw err;
                                console.log("/n" + Table.print(results, {
                                    item_id: { name: "Product ID" },
                                    product_name: { name: "Product Name" },
                                    department_name: { name: "Department" },
                                    price: {
                                        name: "Price ($)",
                                        printer: Table.number(2)
                                    },
                                    stock_quantity: { name: "Stock Quantity" },
                                    cost: { name: "Unit Cost" }
                                })
                                );
                                manager();
                            });
                        break;
                    case "Department":
                        connection.query("SELECT * FROM products ORDER BY department",
                            function (err, results) {
                                if (err) throw err;
                                console.log("/n" + Table.print(results, {
                                    item_id: { name: "Product ID" },
                                    product_name: { name: "Product Name" },
                                    department_name: { name: "Department" },
                                    price: {
                                        name: "Price ($)",
                                        printer: Table.number(2)
                                    },
                                    stock_quantity: { name: "Stock Quantity" },
                                    cost: { name: "Unit Cost" }
                                })
                                );
                                manager();
                            });
                        break;



                }

            }
            )
        }
    })
}
module.exports = login;
login();