require("dotenv").config();
const connection = require("./config/database");
const express = require("express"); // comon node
const configViewEngine = require("./config/viewEngine");
const apiRoutes = require("./routes/apiRoute");
// const firebaseRoute = require("./routes/firebase_route");
const cors = require("cors");
// import express from express // es modules
const app = express(); // khai baos
const port = process.env.PORT; /// port
const hostname = process.env.HOST_NAME || 8888;
//config view engine
configViewEngine(app);
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));
//test connection
app.use(
  cors({
    origin: "http://localhost:3000", // Chỉ định miền localhost
  })
);
app.options("*", cors());

(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Sever backEnd of CodeLab on port ${port}`);
    });
  } catch (error) {
    console.log(">>>>Error to connect to db", error);
  }
})();

//khai bao route
app.use(express.json());
app.use(apiRoutes);
// app.use(firebaseRoute);
