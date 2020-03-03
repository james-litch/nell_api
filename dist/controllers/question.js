"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = exports.answer = exports.removeCurrent = exports.addCurrent = exports.remove = exports.add = void 0;

var _validate = require("./validate");

var _validators = require("../validators");

var _models = require("../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var add =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var userId, subjectId, question, answers, correctAnswer, answersObj, createdQuestion, update;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = _ref.userId, subjectId = _ref.subjectId, question = _ref.question, answers = _ref.answers, correctAnswer = _ref.correctAnswer;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId,
              question: question,
              answers: answers,
              correctAnswer: correctAnswer
            }, _validators.QuestionInput.add);
            answersObj = [];
            answers.forEach(function (answer) {
              answersObj.push({
                answer: answer,
                totalChosen: 0
              });
            }); // add question to questions.

            _context.next = 6;
            return _models.Question.create({
              question: question,
              answers: answersObj,
              correctAnswer: correctAnswer
            });

          case 6:
            createdQuestion = _context.sent;
            _context.next = 9;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $addToSet: {
                questions: createdQuestion._id
              }
            });

          case 9:
            update = _context.sent;
            return _context.abrupt("return", createdQuestion);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function add(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.add = add;

var remove =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref3) {
    var subjectId, questionIds, deletedQuestion, subject;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            subjectId = _ref3.subjectId, questionIds = _ref3.questionIds;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId,
              questionIds: questionIds
            }, _validators.QuestionInput.remove); // remove question.

            _context2.next = 4;
            return _models.Question.deleteMany({
              _id: {
                $in: questionIds
              }
            });

          case 4:
            deletedQuestion = _context2.sent;
            _context2.next = 7;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $pull: {
                questions: {
                  $in: questionIds
                },
                currentQuestions: {
                  $in: questionIds
                },
                'exams.$[].questions': {
                  $in: questionIds
                }
              }
            }, {
              "new": true
            });

          case 7:
            subject = _context2.sent;

            if (!(deletedQuestion && subject)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", 'success');

          case 10:
            return _context2.abrupt("return", 'error');

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function remove(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.remove = remove;

var addCurrent =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref5) {
    var subjectId, questionId, update;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            subjectId = _ref5.subjectId, questionId = _ref5.questionId;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId,
              questionId: questionId
            }, _validators.QuestionInput.addCurrent); // add question id to currentQuestions.

            _context3.next = 4;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $addToSet: {
                currentQuestions: questionId
              }
            }, {
              "new": true
            });

          case 4:
            update = _context3.sent;

            if (!update) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", 'success');

          case 7:
            return _context3.abrupt("return", 'error');

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addCurrent(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.addCurrent = addCurrent;

var removeCurrent =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref7) {
    var subjectId, update;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            subjectId = _ref7.subjectId;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId
            }, _validators.QuestionInput.removeCurrent); // add question id to currentQuestions.

            _context4.next = 4;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $set: {
                currentQuestions: []
              }
            }, {
              "new": true
            });

          case 4:
            update = _context4.sent;

            if (!update) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", 'succsess');

          case 7:
            return _context4.abrupt("return", 'error');

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function removeCurrent(_x4) {
    return _ref8.apply(this, arguments);
  };
}();

exports.removeCurrent = removeCurrent;

var answer =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref9) {
    var userId, subjectId, questionId, answerIndex, ansIndex, update;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = _ref9.userId, subjectId = _ref9.subjectId, questionId = _ref9.questionId, answerIndex = _ref9.answerIndex;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId,
              questionId: questionId,
              answerIndex: answerIndex
            }, _validators.QuestionInput.answer);
            ansIndex = {};
            ansIndex["answers.".concat(answerIndex, ".totalChosen")] = 1; // increment answer index total add user to aswered by.

            _context5.next = 6;
            return _models.Question.findOneAndUpdate({
              _id: questionId
            }, {
              $inc: ansIndex,
              $addToSet: {
                answeredBy: userId
              }
            }, {
              "new": true
            });

          case 6:
            update = _context5.sent;
            return _context5.abrupt("return", update);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function answer(_x5) {
    return _ref10.apply(this, arguments);
  };
}();

exports.answer = answer;

var find =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_ref11) {
    var subjectId, questionId, subject, question;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            subjectId = _ref11.subjectId, questionId = _ref11.questionId;
            _context6.next = 3;
            return _models.Subject.findOne({
              _id: subjectId
            });

          case 3:
            subject = _context6.sent;
            question = subject.questions.find(function (item) {
              return item._id.toString() === questionId;
            });
            return _context6.abrupt("return", question);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function find(_x6) {
    return _ref12.apply(this, arguments);
  };
}();

exports.find = find;