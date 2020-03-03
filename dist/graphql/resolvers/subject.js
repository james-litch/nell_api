"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controllers = require("../../controllers");

var _default = {
  Query: {
    findSubject: function findSubject(root, _ref, _ref2, info) {
      var input = _ref.input;
      var req = _ref2.req;
      return _controllers.Subject.find({
        subjectId: input.subjectId
      });
    }
  },
  Mutation: {
    createSubject: function createSubject(root, _ref3, _ref4, info) {
      var input = _ref3.input;
      var req = _ref4.req;
      return _controllers.Subject.create({
        userId: req.user.id,
        subjectName: input.subjectName,
        password: input.password
      });
    },
    joinSubject: function joinSubject(root, _ref5, _ref6, info) {
      var input = _ref5.input;
      var req = _ref6.req;
      return _controllers.Subject.join({
        userId: req.user.id,
        subjectId: input.subjectId,
        password: input.password
      });
    },
    deleteSubject: function deleteSubject(root, _ref7, _ref8, info) {
      var input = _ref7.input;
      var req = _ref8.req;
      return _controllers.Subject.remove({
        subjectId: input.subjectId
      });
    },
    leaveSubject: function leaveSubject(root, _ref9, _ref10, info) {
      var input = _ref9.input;
      var req = _ref10.req;
      return _controllers.Subject.leave({
        userId: req.user.id,
        subjectId: input.subjectId
      });
    },
    subjectFeedback: function subjectFeedback(root, _ref11, _ref12, info) {
      var input = _ref11.input;
      var req = _ref12.req;
      return _controllers.Subject.feedback({
        subjectId: input.subjectId,
        question: input.question
      });
    },
    clearFeedback: function clearFeedback(root, _ref13, _ref14, info) {
      var input = _ref13.input;
      var req = _ref14.req;
      return _controllers.Subject.clearFeedback({
        subjectId: input.subjectId
      });
    },
    addAdmin: function addAdmin(root, _ref15, _ref16, info) {
      var input = _ref15.input;
      var req = _ref16.req;
      return _controllers.Subject.addAdmin({
        subjectId: input.subjectId,
        userId: input.userId
      });
    }
  }
};
exports["default"] = _default;