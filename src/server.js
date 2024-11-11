require("dotenv").config();
const connection = require("./config/database");
const express = require("express"); // comon node
const apiRoutes = require("./routes/apiRoute");
// const firebaseRoute = require("./routes/firebase_route");
const cors = require("cors");
// import express from express // es modules
const app = express(); // khai baos
const port = process.env.PORT || 8888; // Nếu PORT không được thiết lập, sử dụng cổng 8888
const hostname = process.env.HOST_NAME || "0.0.0.0"; // Lắng nghe trên tất cả các địa chỉ IP
//config view engine
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));
//test connection
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:3001",
//       "https://codelab-fulltack.onrender.com",
//       "https://codelabfullstack.site/",
//       "https://tuananhdeptrai16.github.io/admincodelab/",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức HTTP được phép
//     credentials: true, // Nếu bạn cần gửi cookie hoặc thông tin xác thực
//   })
// );
app.use(cors());
app.options("*", cors());
app.get("/", (req, res) => {
  res.send("Hello World!"); // hoặc trả về một file HTML
});
// (async () => {
//   try {
//     await connection();
//     app.listen(port, hostname, () => {
//       console.log(`Sever backEnd of CodeLab on port ${port}`);
//     });
//   } catch (error) {
//     console.log(">>>>Error to connect to db", error);
//   }
// })();
(async () => {
  try {
    await connection();
    app.listen(port, "0.0.0.0", () => {
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
