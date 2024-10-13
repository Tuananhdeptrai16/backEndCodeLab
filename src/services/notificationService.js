const Notification = require("../models/notification");
module.exports = {
  getNotification: async () => {
    let result = Notification.find({});
    return result;
  },
  postNotification: async (data) => {
    try {
      let result = await Notification.create(data);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteNotification: async (id) => {
    let result = await Notification.deleteById(id);
    return result;
  },
  putNotification: async (data) => {
    let result = await Notification.updateOne({ _id: data.id }, { ...data });
    return result;
  },
};
