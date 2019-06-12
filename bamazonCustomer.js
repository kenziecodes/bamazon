var mysql = require("mysql");
var inquirer = require("inquirer")

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});
// run the start function after the connection is made to prompt the user
start();
// connect to the mysql server and sql database

// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.
function start() {
    connection.query("SELECT * FROM products",
        function (err, sqlResponse) {
            if (err) {
                throw err;
            }
            console.log("-----------------------------");
            for (var i = 0; i < sqlResponse.length; i++) {
                console.log(sqlResponse[i].id, sqlResponse[i].product_name, sqlResponse[i].price.toFixed(2), 'QTY:' + sqlResponse[i].stock_quantity);
            }
            console.log("-----------------------------");


            inquirer
                .prompt([{
                    type: "input",
                    name: "itemId",
                    message: "What is the ID of the item you would like?",

                },
                {
                    type: "input",
                    name: "itemQuantity",
                    message: "How many of this item you would like?"
                }

                ]).then(response => {
                    //console.log(response, allItems);
                    var itemWeWantBetter = sqlResponse.filter(function (item) {
                        return item.id === +response.itemId;
                    });

                    if (itemWeWantBetter.length === 0) {
                        console.log('That Id does not exist')
                        start();
                    }
                    else {
                        //we have a valid ID and now we hsould an array with one item in it;
                        var ourItem = itemWeWantBetter.pop();
                        if (ourItem.stock_quantity >= +response.itemQuantity) {
                            //We have enough quantity we hsould adjust database and respond tot he user with their total cost
                            purchaseItem(ourItem.id, +response.itemQuantity);
                            // console.log('we should update data base and give feedback to user');
                        }
                        else {
                            //oops not enough quantity we need to do this again.
                            console.log('Sorry not enough quantity');
                            setTimeout(() => start(), 1000);
                        }
                    }


                    // console.log(ourItem);
                }).catch(err => {
                    console.log(err);
                })
        });

}

function purchaseItem(productId, quantity) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?", [quantity, productId], function (err, data) {
        if (err) console.log(err);
        start();

    })
}


// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.


//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.