const Courses = require("../models/courses");
const aqp = require("api-query-params");
const Lesson = require("../models/lesson");
module.exports = {
  getCourses: async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    delete filter.page;
    let offset = (page - 1) * limit;
    let result = await Courses.find(filter)
      .populate(population)
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  },
  createCourses: async (coursesData) => {
    try {
      if (coursesData.type === "EMPTY_COURSES") {
        const result = await Courses.create(coursesData);
        return result;
      }

      if (coursesData.type === "ADD_LESSON") {
        let myLesson = await Courses.findById(coursesData.coursesId).exec();
        if (!myLesson) {
          console.log("Khóa học không tồn tại với ID:", coursesData.coursesId);
          return null;
        }
        if (coursesData.arrLessons && coursesData.arrLessons.length > 0) {
          for (let i = 0; i < coursesData.arrLessons.length; i++) {
            myLesson.lessonInfo.push(coursesData.arrLessons[i]);
          }
          let result = await myLesson.save();
          return result;
        } else {
          return null;
        }
      }
      if (coursesData.type === "REMOVE_LESSON") {
        let newLessons = await Courses.findById(coursesData.coursesId).exec();
        for (let i = 0; i < coursesData.arrLessons.length; i++) {
          newLessons.lessonInfo.pull(coursesData.arrLessons[i]);
        }
        let result = await newLessons.save();
        return result;
      }
      //add reviews
      if (coursesData.type === "ADD_REVIEWS") {
        let myReviews = await Courses.findById(coursesData.coursesId).exec();
        if (!myReviews) {
          console.log("Review không tồn tại với ID:", coursesData.coursesId);
          return null;
        }
        if (coursesData.arrReviews && coursesData.arrReviews.length > 0) {
          for (let i = 0; i < coursesData.arrReviews.length; i++) {
            myReviews.reviewsInfo.push(coursesData.arrReviews[i]);
          }
          let result = await myReviews.save();
          return result;
        } else {
          return null;
        }
      }

      if (coursesData.type === "REMOVE_REVIEWS") {
        let newReviews = await Courses.findById(coursesData.coursesId).exec();
        for (let i = 0; i < coursesData.arrReviews.length; i++) {
          newReviews.reviewsInfo.pull(coursesData.arrReviews[i]);
        }
        let result = await newReviews.save();
        return result;
      }
      //add user
      if (coursesData.type === "ADD_USER") {
        let myCourses = await Courses.findById(coursesData.coursesId).exec();
        if (!myCourses) {
          console.log(
            "Nguoi dung không tồn tại với ID:",
            coursesData.coursesId
          );
          return null;
        }
        if (coursesData.arrUser && coursesData.arrUser.length > 0) {
          for (let i = 0; i < coursesData.arrUser.length; i++) {
            myCourses.registerInfo.push(coursesData.arrUser[i]);
          }
          let result = await myCourses.save();
          return result;
        } else {
          return null;
        }
      }
      if (coursesData.type === "REMOVE_USER") {
        let newCourses = await Courses.findById(coursesData.coursesId).exec();
        for (let i = 0; i < coursesData.arrUser.length; i++) {
          newCourses.registerInfo.pull(coursesData.arrUser[i]);
        }
        let result = await newCourses.save();
        return result;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  },

  deleteCourses: async (id) => {
    let result = await Courses.deleteById(id);
    return result;
  },
  updateCourses: async (data) => {
    let result = await Courses.updateOne({ _id: data.id }, { ...data });
    return result;
  },
};
