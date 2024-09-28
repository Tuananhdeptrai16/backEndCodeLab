const admin = require("firebase-admin");

// Thay thế đường dẫn này với đường dẫn tới file JSON chứa thông tin tài khoản dịch vụ của bạn
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://codelab-14068-default-rtdb.asia-southeast1.firebasedatabase.app/", // Thay <YOUR_PROJECT_ID> bằng ID dự án Firebase của bạn
});

module.exports = admin;
