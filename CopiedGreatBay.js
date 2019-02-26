// require the MySQL and Inquirer npm packages
let inquirer = require("inquirer");

// connect to the mysql server and sql database
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'FzvnXsF0iL53TX6L',
    database: 'bamazon'
});
connection.connect((err) => {
    if (err) throw err;
    connection.query("SELECT * , concat('$', FORMAT(SUM(price), 2)) FROM products GROUP BY 1 ORDER BY price;", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
    });
});
console.log('connected')
//
// run the start function after the connection is made to prompt the user

start();

function start() {
    // query the database for all items being auctioned
    connection.query("SELECT * , concat('$', FORMAT(SUM(price), 2)) FROM products GROUP BY 1 ORDER BY price;", function (err, results) {
        if (err) throw err;

        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([{
                    name: "choice",
                    type: "rawlist",
                    // build array from products table for inquirer list 
                    choices: function () {
                        let productArray = [];
                        for (let i = 0; i < results.length; i++) {
                            let product_info = "";
                            product_info = `${results[i].product_name} ${results[i].department_name} cost: ${results[i].price}`;
                            productArray.push(product_info);
                        }
                        return productArray;
                    },
                    message: "What item would you like to purchase?"
                },
                {
                    name: "qty",
                    type: "input",
                    message: "How many would you like to purchase?"
                },
                {
                    // Here we ask the user to confirm.
                    type: "confirm",
                    message: `Continue ?:`,
                    name: "confirm",
                    default: true
                }
            ])
            .then(function (inquirerResponse) {
                // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
                if (inquirerResponse.confirm) {
                    //console.log('cmd in inqurire ' + inquirerResponse.cmd);
                    //console.log('searchValue from inqurier ' + inquirerResponse.searchValue);
                    // cmd = inquirerResponse.cmd;
                    //searchValue = inquirerResponse.searchValue;
                    //processCmd(cmd, searchValue);
                    console.log(inquirerResponse)
                    // department = inquirerResponse.department
                    // console.log(department)
                    buyItem(inquirerResponse);

                }
                else {
                    console.log("\nThat's okay, let me know when you are ready to the search again.\n");
                };
            })
        //connection.end();
    })
}
//
function buyItem(inquirerResponse) {
    console.log('in buyItem');
    console.log(inquirerResponse);
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products WHERE ?", { department_name: inquirerResponse.department }, function (err, results) {
        if (err) throw err;
        //console.log(results);
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    //choices: ["POST", "BID", "EXIT"],
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            var product_info = "";
                            product_info = results[i].product_name + ", " + results[i].department_name + ", " + " for " + results[i].price;
                            choiceArray.push(product_info);
                        }
                        return choiceArray;
                    },
                    message: "What item would you like to purchase?"
                },
                {
                    name: "qty",
                    type: "input",
                    message: "How many would you like to purchase?"
                },
                // Here we ask the user to confirm.
                {
                    type: "confirm",
                    message: "Please confirm your purchase.",
                    name: "confirm",
                    default: true
                }
            ])
            .then(function (inquirerResponse) {
                // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
                if (inquirerResponse.confirm) {
                    var chosenItem;
                    console.log(results.length);
                    console.log(inquirerResponse.choice);
                    str = inquirerResponse.choice;
                    console.log(str);
                    var userChoice = str.split(", ")
                    //var userChoice = str[0] - 1;
                    console.log(userChoice)
                    userChoice = userChoice[0];
                    console.log('after parsing')
                    console.log(userChoice)
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].product_name == userChoice) {
                            chosenItem = results[i];
                            console.log(chosenItem);
                        }
                    }
                    console.log(inquirerResponse)
                    console.log(chosenItem)
                    console.log(chosenItem.item_id)
                    connection.query(
                        "SELECT * FROM products WHERE ?", { item_id: chosenItem.item_id },
                        function (err, results) {
                            if (err) throw err;
                            console.log("Bid placed successfully!");
                            console.log(inquirerResponse)
                            console.log(results[0])
                            //
                            qty = parseInt(inquirerResponse.qty)
                            if (results[0].stock_quanity > qty) {
                                var totalPurchase = (qty * chosenItem.price);
                                var msg = `Your purchase of ${inquirerResponse.qty} ${chosenItem.product_name} ${chosenItem.department_name} comes to ${totalPurchase}`
                                console.log(msg)
                            }
                            else {
                                msg = `Sorry we only ${results[0].stock_quanity} in stock for ${chosenItem.product_name} ${chosenItem.department_name}`
                                console.log(msg);
                            }

                        })
                }
                else {
                    console.log("\nThat's okay, let me know when you are ready to purchase an item.\n");
                }
                connection.end();
            }

            )

    })
};
