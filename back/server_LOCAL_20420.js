const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const data = require("./users.json");
app.use(express.json());

app.use(cors());
//Users
const jsonData = fs.readFileSync("./users.json");
const jsonObj = JSON.parse(jsonData);
//Invoice Data
const InvoicData = fs.readFileSync("./invoiceData.json");
const invoiceObj = JSON.parse(InvoicData);



app.post("/login", (req, res) => {
  const userName = req.body.username;
  const passWord = req.body.password;
  console.log(req.body);

  if (jsonObj.username == userName && jsonObj.password == passWord) {
    res.send("good");

  
  } else {
    res.send(userName);
    // res.end()
  }
});

// post to invoiceData json file
app.post("/post", (req, res) => {
  
  // let newInvoice = {
  //   id: (jsonObj.length)?jsonObj.length + 1:0,
  //   date: new Date(),
  //   clintName: req.body.clintName,
  //   clintPhone: req.body.clintPhone,
  //   itemId: req.body.itemId,
  //   subTotal: req.body.subTotal,
  //   tax: req.body.tax,
  //   totalAmount: req.body.totalAmount,
  // };

  let newPost = { id: invoiceObj.length+1  , ...req.body }

  invoiceObj.push(newPost); // push new post
  // Array.prototype.push.apply(jsonObj, postData);
  //push in the current json file
  fs.writeFile("./invoiceData.json", JSON.stringify(invoiceObj), (err) => {
  });
   console.log("test")

  res.json("");
});

// get id from invoise json
app.get("/getApi", (req, res) => {

  let id = (invoiceObj.length)?invoiceObj.length+1:1;
  console.log("ds",id)
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const date = new Date()
  const dateString = `${MONTHS[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`
  console.log(dateString)
  res.json([id,dateString]);
});

app.listen(3003, console.log("running"));
