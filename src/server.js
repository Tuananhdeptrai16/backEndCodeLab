require("dotenv").config();
const mysql = require("mysql2");
const connection = require("./config/database");
const express = require("express"); // comon node
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
// import express from express // es modules
const app = express(); // khai baos
const port = process.env.PORT; /// port
const hostname = process.env.HOST_NAME || 8888;
//config view engine
configViewEngine(app);
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));
//test connection

(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`BackEnd zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>>>Error to connect to db", error);
  }
})();
//khai baos route
app.use("/", webRoutes);
app.use("/v1/api", apiRoutes);
