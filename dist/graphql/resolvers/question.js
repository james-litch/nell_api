"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controllers = require("../../controllers");

var _default = {
  Query: {
    findQuestion: function findQuestion(root, _ref, _ref2, info) {
      var input = _ref.input;
      var req = _ref2.req;
      return _controllers.Question.find({
        subjectId: input.subjectId,
        questionId: input.questionId
      });
    }
  },
  Mutation: {
    addQuestion: function addQuestion(root, _ref3, _ref4, info) {
      var input = _ref3.input;
      var req = _ref4.req;
      return _controllers.Question.add({
        userId: req.user.id,
        subjectId: input.subjectId,
        question: input.question,
        answers: input.answers,
        correctAnswer: input.correctAnswer
      });
    },
    removeQuestions: function removeQuestions(root, _ref5, _ref6, info) {
      var input = _ref5.input;
      var req = _ref6.req;
      return _controllers.Question.remove({
        userId: req.user.id,
        subjectId: input.subjectId,
        questionIds: input.questionIds
      });
    },
    addCurrentQuestion: function addCurrentQuestion(root, _ref7, _ref8, info) {
      var input = _ref7.input;
      var req = _ref8.req;
      return _controllers.Question.addCurrent({
        subjectId: input.subjectId,
        questionId: input.questionId
      });
    },
    removeCurrentQuestion: function removeCurrentQuestion(root, _ref9, _ref10, info) {
      var input = _ref9.input;
      var req = _ref10.req;
      return _controllers.Question.removeCurrent({
        subjectId: input.subjectId
      });
    },
    answerQuestion: function answerQuestion(root, _ref11, _ref12, info) {
      var input = _ref11.input;
      var req = _ref12.req;
      return _controllers.Question.answer({
        userId: req.user.id,
        subjectId: input.subjectId,
        questionId: input.questionId,
        answerIndex: input.answer
      });
    }
  }
};
exports["default"] = _default;