const Lessons = require("../models/lesson");
const aqp = require("api-query-params");

module.exports = {
  createLesson: async (LessonData) => {
    try {
      if (LessonData.type === "EMPTY_LESSON") {
        let result = await Lessons.create(LessonData);
        return result;
      }
      if (LessonData.type === "ADD_COMMENT_USERS") {
        let myLesson = await Lessons.findById(LessonData.lessonsId).exec();

        // Thêm bình luận mới vào bài học
        myLesson.comments.push({
          userId: LessonData.userId, // ID người dùng
          comment: LessonData.comment || "", // Thêm bình luận nếu có
        });

        let result1 = await myLesson.save();
        return result1;
      }
      if (LessonData.type === "REMOVE_ALL_COMMENT_USERS") {
        let myLesson = await Lessons.findById(LessonData.lessonsId).exec();
        myLesson.comments = myLesson.comments.filter(
          (comment) => comment.userId.toString() !== LessonData.userId
        );

        let result1 = await myLesson.save();
        return result1;
      }
      if (LessonData.type === "REMOVE_COMMENT") {
        let myLesson = await Lessons.findById(LessonData.lessonsId).exec();

        // Xóa bình luận của người dùng
        const commentIndex = myLesson.comments.findIndex(
          (comment) => comment._id.toString() === LessonData.commentId
        );
        // Nếu tìm thấy bình luận, xóa nó
        if (commentIndex !== -1) {
          myLesson.comments.splice(commentIndex, 1);
          let result2 = await myLesson.save();
          return result2;
        } else {
          // Trả về thông báo hoặc xử lý khi không tìm thấy bình luận
          return { message: "Comment not found." };
        }
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  },
  getLesson: async (queryString) => {
    const page = queryString.page;
    const { filter, limit } = aqp(queryString);
    delete filter.page;
    let offset = (page - 1) * limit;
    let result = Lessons.find(filter).skip(offset).limit(limit).exec();
    return result;
  },
  deleteLesson: async (_id) => {
    let result = await Lessons.deleteById(_id);
    return result;
  },
  deleteManyLesson: async (dataDelete) => {
    console.log("Check data delete", dataDelete);
    try {
      let results = await Lessons.deleteMany(dataDelete);
      if (results.deletedCount === 0) {
        console.log("No lessons were deleted.");
      } else {
        console.log(`${results.deletedCount} lessons were deleted.`);
      }

      return results;
    } catch (error) {
      console.log("Error deleting lessons:", error);
      throw new Error("Failed to delete lessons");
    }
  },
  updateLesson: async (data) => {
    let result = await Lessons.updateOne({ _id: data.id }, { ...data });
    return result;
  },
};
