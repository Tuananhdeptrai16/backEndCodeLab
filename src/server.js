require("dotenv").config();
const express = require("express"); // comon node
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
// import express from express // es modules
const app = express(); // khai baos
const port = process.env.PORT; /// port
const hostname = process.env.HOST_NAME || 8888;
//config view engine
configViewEngine(app);
//khai baos route
app.use("/", webRoutes);
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
