const {
  getNotification,
  postNotification,
  deleteNotification,
  putNotification,
} = require("../services/notificationService");
module.exports = {
  getNotificationAPI: async (req, res) => {
    try {
      let result = await getNotification();
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EC: 1,
        message: err.message,
      });
    }
  },
  postNotificationAPI: async (req, res) => {
    try {
      let data = req.body;
      let result = await postNotification(data);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EC: 1,
        message: err.message,
      });
    }
  },
  deleteNotificationAPI: async (req, res) => {
    const id = req.body;
    let result = await deleteNotification(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putNotificationAPI: async (req, res) => {
    const data = req.body;
    let result = await putNotification(data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
