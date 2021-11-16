const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const data = require("./users.json");
const invoiceData = require("./invoiceData.json");
app.use(express.json());

app.use(cors());

app.post("/login", (req, res) => {
  const userName = req.body.username;
  const passWord = req.body.password;
  console.log(req.body);

  const jsonData = fs.readFileSync("./users.json");
  const jsonObj = JSON.parse(jsonData);
  if (jsonObj.username == userName && jsonObj.password == passWord) {
    res.send("good");

    // res.end()
  } else {
    res.send(userName);
    // res.end()
  }
});

// post to invoiceData json file
app.post("/getInfo", (req, res) => {
  let newInvoice = {
    id: (invoiceData.length-1).id + 1,
    date: new Date().toLocaleString(),
    clintName: req.body.clintName,
    clintPhone: req.body.clintPhone,
    itemId: req.body.itemId,
    itemName: req.body.itemName,
    price: req.body.price,
    amount: req.body.amount,
    quntity: req.body.quntity,
    total: req.body.total,
    subTotal: req.body.subTotal,
    tax: 0.15,
    totalAmount: req.body.totalAmount,
  };

  invoiceData.push(newInvoice);

  res.json(invoiceData);
});

// get id from invoise json

app.get("/getId", (req, res) => {
  console.log(req.body);

  const jsonInvoice = fs.readFileSync("./invoiceData.json");
  const invoiceObj = JSON.parse(jsonInvoice);

  res.send(invoiceObj.id + 1);
});

app.put("/putInfo", (req, res) => {
  let found = invoiceData.find((item) => {
    return item.id === parseInt(req.params.id);
  });
  if (found) {
    let update = {
      id: found.id,
      date: found.data,
      clintName: req.body.clintName,
      clintPhone: req.body.clintPhone,
      itemId: found.itemId,
      itemName: req.body.itemName,
      price: req.body.price,
      amount: req.body.amount,
      quntity: req.body.quntity,
      total: found.total,
      subTotal: found.subTotal,
      tax: found.tax,
      totalAmount: found.totalAmount,
    };
    const target  = invoiceData.indexOf(found)

    invoiceData.splice(target , 1 , update)
    res.send(invoiceData)

  }else{
    res.sendStatus(404)
  }
});

app.listen(3003, console.log("running"));
