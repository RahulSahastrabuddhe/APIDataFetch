const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("welcome home rahul");
});

app.listen(port, () => console.log(`Hello Rahul`));
