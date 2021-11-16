const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

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


app.post("/post", (req, res) => {
  let newPost = { id: invoiceObj.length + 1, ...req.body };

  invoiceObj.push(newPost); // push new post
  //write in the current json file
  fs.writeFile("./invoiceData.json", JSON.stringify(invoiceObj), (err) => {});
  console.log("test");

  res.json("");
});

// get id from invoise json
app.get("/getApi", (req, res) => {
  let id = invoiceObj.length ? invoiceObj.length + 1 : 1;
  console.log("ds", id);
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  const dateString = `${
    MONTHS[date.getMonth()]
  } ${date.getDate()},${date.getFullYear()}`;
  console.log(dateString);
  res.json([id, dateString]);
});

app.get("/getAll", (req, res) => {
  console.log(invoiceObj);
  res.json(invoiceObj);
});

app.put("/:id", (req, res) => {
  let index = invoiceObj.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );
  // if the user enter wrong id
  if (index == -1) return res.send("The id is not exsist");
  //else
  let newPost = { id: parseInt(req.params.id), ...req.body };

  invoiceObj[index] = newPost;

  fs.writeFile("./invoiceData.json", JSON.stringify(invoiceObj), (err) => {
    if (err) {
      throw err;
    }
  });
  res.send(jsonObj);
});

app.delete("/:id", (req, res) => {
  let index = invoiceObj.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );
  // if the user enter wrong id
  if (index == -1) return res.send("The id is not found");
  //else
  invoiceObj.splice(index, 1);

  fs.writeFile("./invoiceData.json", JSON.stringify(invoiceObj), (err) => {
    if (err) {
      throw err;
    }
  });
  res.send(invoiceObj);
});

app.listen(3003, console.log("running"));

