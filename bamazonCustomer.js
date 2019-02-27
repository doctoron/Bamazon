const mysql = require('mysql');
const inquirer = require("inquirer");
const Table = require("easy-table");

let options = ["Search", "Order", "Return to Main Menu"];

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'FzvnXsF0iL53TX6L',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
});
let customer = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "\nHow can I help you?\n",
            choices: options,
            name: "customer"
        }
    ]).then(function (res) {
        switch (res.customer) {
            case options[0]:
                view();
                break;
            case options[1]:
                order();
                break;
            case options[2]:
                let welcome = require("./bamazon.js");
                welcome();
                break;
        }
    });
};

let view = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "\nSort by: ",
            choices: ["Price (Ascending)", "Price (Descending)", "Department"],
            name: "options"
        }
    ]).then(function (res) {
        switch (res.options) {
            case "Price (Ascending)":
                connection.query("SELECT * FROM products ORDER BY price ASC", function (err, results) {
                    if (err) throw err;
                    console.log("\n" + Table.print(results,
                        {
                            item_id: { name: "Product ID" },
                            product_name: { name: "Product Name" },
                            department_name: { name: "Department" },
                            price: { name: "Price ($)", printer: Table.number(2) },
                            stock_quantity: { name: "Quantity in Stock" }
                        })
                    );
                    customer();
                });
                break;

            case "Price (Descending)":
                connection.query("SELECT * FROM products ORDER BY price DESC", function (err, results) {
                    if (err) throw err;
                    console.log("\n" + Table.print(results,
                        {
                            item_id: { name: "Product ID" },
                            product_name: { name: "Product Name" },
                            department_name: { name: "Department" },
                            price: { name: "Price ($)", printer: Table.number(2) },
                            stock_quantity: { name: "Quantity in Stock" }
                        })
                    );
                    customer();
                });
                break;
            case "Department":
                connection.query("SELECT * FROM products ORDER BY department_name", function (err, results) {
                    if (err) throw err;
                    console.log("\n" + Table.print(results,
                        {
                            item_id: { name: "Product ID" },
                            product_name: { name: "Product Name" },
                            department_name: { name: "Department" },
                            price: { name: "Price ($)", printer: Table.number(2) },
                            stock_quantity: { name: "Quantity in Stock" }
                        })
                    );
                    customer();
                });
                break;
        }
    });
};

let order = () => {
    connection.query("SELECT * FROM products", function (err, res1) {
        if (err) throw err;
        let results = res1;

        connection.query("SELECT * FROM products", function (err, res2) {
            if (err) throw err;
            let results1 = res2;
            let a = Table.print(results1).substring(Table.print(results1).indexOf("1")).split("\n");
            let itemsopt = a.splice(0, a.indexOf(""));

            inquirer.prompt([
                {
                    type: "checkbox",
                    message: "\nPlease make your selection.\n(product ID, product name, department, price ($), stock quantity)\n",
                    choices: itemsopt,
                    name: "order",
                    pageSize: 40
                }
            ]).then(function (res) {
                nestedinquirer(res.order, results);
            });
        });
    });
};

nestedinquirer = (answer, data) => {
    let data1 = data;
    let index = [];
    for (i = 0; i < answer.length; i++) {
        index.push(answer[i].split(" ")[0]);
    }
    i = 0;
    inquiry(index, data1);
    inquiry = (index, data) => {
        if (i < index.length) {
            let ind = index[i] - 1;
            let name = data[ind].product_name;
            let stock = data[ind].stock_quantity;
            let dept = data[ind].department_name;
            let cost = data[ind].cost;
            let price = data[ind].price;
            inquirer.prompt([
                {
                    type: "input",
                    message: "\nHow many " + name + " do you want to purchase?",
                    name: "quantity",
                    validate: (value) => {
                        if (!isNaN(value) && value <= stock) {
                            return true;
                        }
                        return false;
                    }
                }
            ]).then(function (res) {
                connection.query("UPDATE products SET stock_quantity WHERE product_name = ?", [stock - res.quantity, name], function (err, results) {
                    if (err) throw err;
                });
                updatedept(dept, cost, price, res.quantity);
                i++;
                inquiry(index, data1);
            });
        }
        else {
            console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
            console.log("Thank you for your order.  Come again soon.");
            console.log("\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
            customer();
        };
    };

};

updateDept = (dept, cost, price, quant) => {
    connection.query("SELECT * FROM departments WHERE department_name = ?", [dept],
        function (err, res) {
            let result = res;
            let newCost = parseFloat(result[0].product_cost) + parseFloat(cost) * parseInt(quant);
            let newSales = parseFloat(result[0].product_sales) + parseFloat(price) * parseInt(quant);
            let newProfit = parseFloat(result[0].total_profit) + (parseFloat(price) - parseFloat(cost)) * parseInt(quant);

            connection.query("UPDATE departments SET product_costs = ? WHERE department_name = ?", [newCost, dept], function (err, resp) {
                if (err) throw err;
            });
            connection.query("UPDATE departments SET product_sales = ? WHERE department_name = ?", [newSales, dept], function (err, resp) {
                if (err) throw err;
            });
            connection.query("UPDATE departments SET total_profits = ? WHERE department_name = ?", [newProfit, dept], function (err, resp) {
                if (err) throw err;
            });
        });
};
module.exports = customer;