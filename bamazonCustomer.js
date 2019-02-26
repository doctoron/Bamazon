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
         

// console.log("Connected as id: " + connection.threadId);
// start();

// let start = function () {
//     inquirer.prompt({
//         name: "choice",
//         type: "rawlist",
//         message:
//             "\n What would you like to purchase?"
//         choices: function () {
//             let productArray = [];
//             for (let i = 0; i < results.length; i++) {
//                 let product_info = "";
//                 product_info = `item: ${results[i].product_name} cost: ${results[i].price}`;
//                 productArray.push(product_info);
//             }
//             return productArray;
//         },
//     },
//             .then(function (inquirerResponse) {
//         if (inquirerAnswer.confirm) {
//             console.log(inquirerResponse)
//             buyItem(inquirerResponse);
//         }
//         else {
//             console.log("Come back again soon.");
//         }
//     })
// }


//         // function to handle purchase of new items
//         function buyItem(inquirerResponse) {
//             console.log('in buyItem');
//             console.log(inquirerResponse);
//             // prompt for info about the item being sold
//             connection.query("SELECT * FROM products WHERE ?", { department_name: inquirerResponse.department }, function (err, results) {
//                 if (err) throw err;
//                 //console.log(results);
//                 // once you have the items, prompt the user for which they'd like to bid on

//                 inquirer
//                     .prompt([
//                         {
//                             name: "choice",
//                             type: "rawlist",
//                             choices: function () {
//                                 let choiceArray = [];
//                                 for (let i = 0; i < results.length; i++) {
//                                     let produt_infor = "";
//                                     product_info = results[i].product_name + ", " + results[i].department_name + ", " + " for " + results[i].price;
//                                     choiceArray.push(product_info);
//                                 }
//                                 return choiceArray;
//                             },
//                             message: "What item would you like to purchase?"
//                         },
//                         {
//                             name: "qty",
//                             type: "input",
//                             message: "How many would you like to purchase?"
//                         },
//                         // Here we ask the user to confirm.
//                         {
//                             type: "confirm",
//                             message: "Please confirm your purchase.",
//                             name: "confirm",
//                             default: true
//                         }
//                     ])
//                     .then(function (inquirerResponse) {
//                         // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
//                         if (inquirerResponse.confirm) {
//                             var chosenItem;
//                             console.log(results.length);
//                             console.log(inquirerResponse.choice);
//                             str = inquirerResponse.choice;
//                             console.log(str);
//                             var userChoice = str.split(", ")
//                             //var userChoice = str[0] - 1;
//                             console.log(userChoice)
//                             userChoice = userChoice[0];
//                             console.log('after parsing')
//                             console.log(userChoice)
//                             for (var i = 0; i < results.length; i++) {
//                                 if (results[i].product_name == userChoice) {
//                                     chosenItem = results[i];
//                                     console.log(chosenItem);
//                                 }
//                             }
//                             console.log(inquirerResponse)
//                             console.log(chosenItem)
//                             console.log(chosenItem.item_id)
//                             connection.query(
//                                 "SELECT * FROM products WHERE ?", { item_id: chosenItem.item_id },
//                                 function (err, results) {
//                                     if (err) throw err;
//                                     console.log("Bid placed successfully!");
//                                     console.log(inquirerResponse)
//                                     console.log(results[0])
//                                     //
//                                     qty = parseInt(inquirerResponse.qty)
//                                     if (results[0].stock_quanity > qty) {
//                                         var totalPurchase = (qty * chosenItem.price);
//                                         var msg = `Your purchase of ${inquirerResponse.qty} ${chosenItem.product_name} ${chosenItem.department_name} comes to ${totalPurchase}`
//                                         console.log(msg)
//                                     }
//                                     else {
//                                         msg = `Sorry we only ${results[0].stock_quanity} in stock for ${chosenItem.product_name} ${chosenItem.department_name}`
//                                         console.log(msg);
//                                     }

//                                 })
//                         }
//                         else {
//                             console.log("\nThat's okay, let me know when you are ready to purchase an item.\n");
//                         }
//                         connection.end();
//                     })
//             })
//         }
//     }
//     )
// }
