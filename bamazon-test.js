// Test basic CRUD functionality

var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "", // PASSWORD HERE!!!!!!!!!!!!!!!!!!!
    database: "itemDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startingFunction();
});

function startingFunction() {

    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);

        inquirer.prompt([
            {
                type: 'input',
                name: 'firstChoice',
                message: 'Input item ID: '
            },
        ]).then(function (answers) {
            chooseProduct(answers.firstChoice);
        });
    });
}

function chooseProduct(chosenProduct) {

    let parseNum = parseFloat(chosenProduct);

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (let i = 0; i < res.length; i++) {
            if (res[i].item_id === parseNum) {
                chooseProductAmount(res[i]);

                break;
            } else if (i === res.length - 1) {
                console.log('Nothing found!');
            }
        }
    });
}

function chooseProductAmount(item) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstChoice',
            message: 'How many would you like to purchase?: '
        },
    ]).then(function (answers) {
        let itemNum = parseFloat(answers.firstChoice);

        if (itemNum > item.stock_quantity) {
            console.log('We do not have that much product!');
            chooseProductAmount(item);
        } else {
            console.log('Item(s) purchased!');
            itemPrice = parseFloat(item.price * itemNum);
            console.log('Price: $' + itemPrice)
            updateProduct(itemNum, item.item_name, item.stock_quantity)
        }
    });
}

function updateProduct(num, name, stock) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stock - num
            },
            {
                item_name: name
            }
        ],
        function (err, res) {
            console.log(res.affectedRows + " products updated!\n");

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstChoice',
                    message: 'Would you like to purchase more? (y/n): '
                },
            ]).then(function (answers) {
                if(answers.firstChoice === 'y'){
                    startingFunction();
                } else {
                    console.log('Goodbye.');
                    connection.end();
                }
            });
        }
    );
}