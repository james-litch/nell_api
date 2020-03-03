"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = exports.remove = exports.create = void 0;

var _validate = require("./validate");

var _validators = require("../validators");

var _models = require("../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var create =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var userId, subjectId, name, description, questions, update;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = _ref.userId, subjectId = _ref.subjectId, name = _ref.name, description = _ref.description, questions = _ref.questions;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId,
              name: name,
              description: description,
              questions: questions
            }, _validators.ExamInput.create); // add exam to subject.

            _context.next = 4;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $push: {
                exams: {
                  name: name,
                  description: description,
                  questions: questions
                }
              }
            }, {
              "new": true
            });

          case 4:
            update = _context.sent;

            if (!update) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", 'success');

          case 7:
            return _context.abrupt("return", 'error');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.create = create;

var remove =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref3) {
    var userId, subjectId, examIds, update;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = _ref3.userId, subjectId = _ref3.subjectId, examIds = _ref3.examIds;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId,
              examIds: examIds
            }, _validators.ExamInput.remove); // remove exams from subject.

            _context2.next = 4;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $pull: {
                exams: {
                  _id: {
                    $in: examIds
                  }
                }
              }
            }, {
              "new": true
            });

          case 4:
            update = _context2.sent;
            return _context2.abrupt("return", 'success');

          case 6:
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

var find =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref5) {
    var subjectId, examId, subject, exam;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            subjectId = _ref5.subjectId, examId = _ref5.examId;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId,
              examId: examId
            }, _validators.ExamInput.find); // find subject.

            _context3.next = 4;
            return _models.Subject.findOne({
              _id: subjectId
            });

          case 4:
            subject = _context3.sent;
            // find specific exam.
            exam = subject.exams.find(function (item) {
              return item._id.toString() === examId;
            });
            return _context3.abrupt("return", exam);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function find(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.find = find;