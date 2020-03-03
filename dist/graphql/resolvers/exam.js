"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controllers = require("../../controllers");

var _default = {
  Query: {
    findExam: function findExam(root, _ref, _ref2, info) {
      var input = _ref.input;
      var req = _ref2.req;
      return _controllers.Exam.find({
        subjectId: input.subjectId,
        examId: input.examId
      });
    }
  },
  Mutation: {
    createExam: function createExam(root, _ref3, _ref4, info) {
      var input = _ref3.input;
      var req = _ref4.req;
      return _controllers.Exam.create({
        userId: req.user.id,
        subjectId: input.subjectId,
        name: input.name,
        description: input.description,
        questions: input.questions
      });
    },
    removeExams: function removeExams(root, _ref5, _ref6, info) {
      var input = _ref5.input;
      var req = _ref6.req;
      return _controllers.Exam.remove({
        userId: req.user.id,
        subjectId: input.subjectId,
        examIds: input.examIds
      });
    }
  }
};
exports["default"] = _default;