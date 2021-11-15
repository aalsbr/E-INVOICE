const express = require("express");
const app = express();
const fs = require("fs");
const cors = require('cors')
const data = require("./users.json");
app.use(express.json());


app.use(cors())

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

app.listen(3003, console.log("running"));
