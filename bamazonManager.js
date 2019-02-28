require('dotenv').config();
const inquirer = require("inquirer");
const mysql = require('mysql');
const Table = require("easy-table");
let username = "test";
let password = "justatest";

let options = ["View Low Inventory", "View All Inventory", "Update Inventory", "Add New Product", "Return to Main Menu"];
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'bamazon'
});

connection.connect((err) => {
    if (err) throw err;
});

let login = () => {
    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");
    console.log("Please submit your Username and Password");
    inquirer.prompt([
        {
            type: "confirm",
            message: "Ready? \n",
            name: "islogin"
        }
    ]).then(function (res) {
        if (res.islogin) {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Username:",
                    name: "username"
                },
                {
                    type: "password",
                    message: "Password:",
                    name: "password"
                }
            ]).then(function (res) {
                if (res.username === username && res.password === password) {
                    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");
                    console.log("Welcome 'Test' to Manager Access.");
                    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");
                    manager();
                }
                else {
                    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");
                    console.log("Invalid Username or password.");
                    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n");
                    login();
                }
            });
        }
        else {
            let welcome = require("./bamazon.js");
            welcome();
        };
    });
}

let manager = () => {
    inquirer.prompt([
        {
            type: "list",
            choices: options,
            name: "options",
            message: "Please pick a task?"
        }
    ]).then(function (res) {
        switch (res.options) {
            case options[0]:
                viewAll();
                break;
            case options[1]:
                viewLow();
                break;
            case options[2]:
                updateInv();
                break;
            case options[3]:
                addNew();
                break;
            default:
                let welcome = require("./bamazon.js");
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
    });
}
let viewLow = () => {
    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--\n");
    console.log("Low inventory criteria:\n \n1. Magic Wand, Light Saber, Immortality Elixer: less than 5; \n2. Musical Instruments: less than 10; \n3. Electronics and Telescopes: less than 12.");
    console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--\n");
    console.log("Department: Imagination Department\n")
    connection.query("SELECT * FROM products WHERE department_name = \"Imagination Department\" AND stock_quantity < 5", function (err, res) {
        if (err) throw err;
        if (res.lengths === 0) {
            console.log("All items are in sufficient quantity at this time.");
        }
        else {
            console.log(
                Table.print(res, {
                    item_id: { name: "Product ID" },
                    product_name: {
                        name: "Product Name",
                        department_name: { name: "Department Name" },
                        price: { name: "Price ($)", printer: Table.number(2) },
                        cost: { name: "Cost" }
                    }
                })
            );
        }
        console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--\n");
        console.log("Low inventory criteria:\n \n1. Magic Wand, Light Saber, Immortality Elixer: less than 5; \n2. Musical Instruments: less than 10; \n3. Electronics and Telescopes: less than 12.");
        console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--\n");
        console.log("Department: Imagination Department\n")
        connection.query("SELECT * FROM products WHERE department_name = \"Imagination Department\" AND stock_quantity < 5", function (err, res1) {
            if (err) throw err;
            if (res1.length === 0) {
                console.log("All items are in sufficient quantity at this time.");
            }
            else {
                console.log(
                    Table.print(res1, {
                        item_id: { name: "Product ID" },
                        product_name: {
                            name: "Product Name",
                            department_name: { name: "Department Name" },
                            price: { name: "Price ($)", printer: Table.number(2) },
                            cost: { name: "Cost" }
                        }
                    })
                );
            }
        }
        
module.exports = login;
