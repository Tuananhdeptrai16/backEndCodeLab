require("dotenv").config();
const mysql = require("mysql2");
const connection = require("./config/database");
const express = require("express"); // comon node
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
// import express from express // es modules
const app = express(); // khai baos
const port = process.env.PORT; /// port
const hostname = process.env.HOST_NAME || 8888;
//config view engine
configViewEngine(app);

//test connection

// A simple SELECT query
connection.query("select * from Users u", function (err, results, fields) {
  console.log(">>> results ==", results); // results contains rows returned by server
  console.log(">>> fields = ", fields); // fields contains extra meta data about results, if available
});
//khai baos route
app.use("/", webRoutes);
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
