const inq = require('inquirer');
const sql = require('mysql');
let connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});
const itemIDList = [];
const productNameList = [];
const departmentList = [];
const priceList = [];
const stockList = [];

connection.connect(err => {
    if (err) throw err;
    listItems();
});


listItems = () => {
    var query = "SELECT * from items";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.log("--------------------------------------------------------------------");
        console.log("    ID    |    Product Name    |    Department Name    |    Price    |    Stock     ");
        res.forEach(x => {
            itemIDList.push(x.id);
            productNameList.push(x.productName);
            departmentList.push(x.departmentName);
            priceList.push(x.price);
            stockList.push(x.stock);
            console.log(`    ${x.id}    |    ${x.productName}    |    ${x.departmentName}    |    ${x.price}    |    ${x.stock}`);
        });
        inq.prompt([
            {
                type: "number",
                name: "op",
                message: "Welcome to Bamazon! What item would you like to purchase?",
            },
        ]).then(input => {
            console.log(`You selected : ${itemIDList[input.op - 1]} | ${productNameList[input.op - 1]} | ${departmentList[input.op - 1]} | ${priceList[input.op - 1]} | ${stockList[input.op - 1]}`);
            for(let x = 0; x < itemIDList.length; x++)
            {
                if(input.op === itemIDList[x])
                {
                    inq.prompt([
                        {
                            type: "number",
                            name: "buyAmount",
                            message: "How many would you like to buy?"
                        },
                    ]).then(res => {
                        stockList.forEach(x => {
                            console.log(x);
                        })
                        console.log(`${res.buyAmount} | ${stockList[input.op - 1]}`);
                        if(res.buyAmount <= stockList[input.op - 1])
                        {
                            console.log("Order submitted.");
                            let stockUpdate = stockList[input.op - 1] - res.buyAmount;
                            console.log(stockUpdate);
                            let query = `update items set stock ${stockUpdate} where id = ${itemIDList[input.op -1]}`
                            console.log(query);
                        }
                        else
                        {
                            console.log("Not enough in stock, PLease try again later.");
                            listItems();
                        }
                    });
                }
            }
        });
    });
}
