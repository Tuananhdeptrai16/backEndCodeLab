const admin = require("firebase-admin");
require("dotenv").config(); // Nhớ phải import dotenv để sử dụng biến môi trường

// Tạo đối tượng thông tin tài khoản dịch vụ từ các biến môi trường
const serviceAccount = {
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Thay thế newline
  clientEmail: process.env.CLIENT_EMAIL,
};

// Khởi tạo Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://codelab-14068-default-rtdb.asia-southeast1.firebasedatabase.app/", // Địa chỉ database Firebase của bạn
});

module.exports = admin; // Xuất admin để sử dụng ở các module khác
