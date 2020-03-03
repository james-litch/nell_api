"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAdmin = exports.find = exports.clearFeedback = exports.feedback = exports.remove = exports.leave = exports.join = exports.create = void 0;

var _models = require("../models");

var _validate = require("./validate");

var _validators = require("../validators");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var create =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var userId, subjectName, password, subject, subjectObj;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = _ref.userId, subjectName = _ref.subjectName, password = _ref.password;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectName: subjectName,
              password: password
            }, _validators.SubjectInput.create); // create subject.

            _context.next = 4;
            return _models.Subject.create({
              name: subjectName,
              admins: [userId],
              password: password
            });

          case 4:
            subject = _context.sent;
            // add subject to user.
            subjectObj = {
              subject: subject._id,
              admin: true
            };
            _context.next = 8;
            return _models.User.findOneAndUpdate({
              _id: userId
            }, {
              $addToSet: {
                subjects: subjectObj
              }
            });

          case 8:
            return _context.abrupt("return", subject);

          case 9:
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

var join =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref3) {
    var userId, subjectId, password, subject, subjectObj;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = _ref3.userId, subjectId = _ref3.subjectId, password = _ref3.password;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId,
              password: password
            }, _validators.SubjectInput.join); // check if subject exists.

            _context2.next = 4;
            return (0, _validate.isSubject)(subjectId);

          case 4:
            subject = _context2.sent;
            _context2.next = 7;
            return (0, _validate.matchesPassword)(subject, password);

          case 7:
            _context2.next = 9;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $addToSet: {
                users: userId
              }
            });

          case 9:
            subjectObj = {
              subject: subject._id,
              admin: false
            };
            _context2.next = 12;
            return _models.User.findOneAndUpdate({
              _id: userId
            }, {
              $addToSet: {
                subjects: subjectObj
              }
            });

          case 12:
            return _context2.abrupt("return", subject);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function join(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.join = join;

var remove =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref5) {
    var subjectId, subject, questions, users, admins, removedQuestions, updatedUsers;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            subjectId = _ref5.subjectId;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId
            }, _validators.SubjectInput.remove); // delete subject.

            _context3.next = 4;
            return _models.Subject.findOneAndRemove({
              _id: subjectId
            });

          case 4:
            subject = _context3.sent;
            // extract questions users and admins.
            questions = subject.questions, users = subject.users, admins = subject.admins; // map through objects and retrieve ids.

            users = users.map(function (item) {
              return item._id;
            });
            admins = admins.map(function (item) {
              return item._id;
            }); // combine admins and users.

            users = Array.from(new Set(users.concat(admins))); // delete questions if array contains any ids.

            if (!(questions.length > 0)) {
              _context3.next = 14;
              break;
            }

            questions = questions.map(function (item) {
              return item._id;
            });
            _context3.next = 13;
            return _models.Question.deleteMany({
              _id: {
                $in: questions
              }
            });

          case 13:
            removedQuestions = _context3.sent;

          case 14:
            _context3.next = 16;
            return _models.User.updateMany({
              _id: {
                $in: users
              }
            }, {
              $pull: {
                subjects: {
                  subject: {
                    _id: subjectId
                  }
                }
              }
            });

          case 16:
            updatedUsers = _context3.sent;

            if (!(subject && updatedUsers)) {
              _context3.next = 19;
              break;
            }

            return _context3.abrupt("return", 'success');

          case 19:
            return _context3.abrupt("return", 'error');

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function remove(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.remove = remove;

var feedback =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref7) {
    var subjectId, question, update;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            subjectId = _ref7.subjectId, question = _ref7.question;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId,
              question: question
            }, _validators.SubjectInput.feedback); // push question to admin questions.

            _context4.next = 4;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $push: {
                feedback: question
              }
            }, {
              "new": true
            });

          case 4:
            update = _context4.sent;
            return _context4.abrupt("return", 'success');

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function feedback(_x4) {
    return _ref8.apply(this, arguments);
  };
}();

exports.feedback = feedback;

var clearFeedback =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref9) {
    var subjectId, update;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            subjectId = _ref9.subjectId;
            // validate inputs.
            (0, _validate.validateInput)({
              subjectId: subjectId
            }, _validators.SubjectInput.clearFeedback); // clear content.

            _context5.next = 4;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $set: {
                feedback: []
              }
            }, {
              "new": true
            });

          case 4:
            update = _context5.sent;
            return _context5.abrupt("return", 'success');

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function clearFeedback(_x5) {
    return _ref10.apply(this, arguments);
  };
}();

exports.clearFeedback = clearFeedback;

var leave =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_ref11) {
    var userId, subjectId, subject, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userId = _ref11.userId, subjectId = _ref11.subjectId;
            // validate inputs
            (0, _validate.validateInput)({
              subjectId: subjectId
            }, _validators.SubjectInput.leave); // remove user from subject and subject from user.

            _context6.next = 4;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $pull: {
                users: userId
              }
            });

          case 4:
            subject = _context6.sent;
            _context6.next = 7;
            return _models.User.findOneAndUpdate({
              _id: userId
            }, {
              $pull: {
                subjects: {
                  subject: {
                    _id: subjectId
                  }
                }
              }
            });

          case 7:
            user = _context6.sent;

            if (!(subject && user)) {
              _context6.next = 10;
              break;
            }

            return _context6.abrupt("return", 'success');

          case 10:
            return _context6.abrupt("return", 'error');

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function leave(_x6) {
    return _ref12.apply(this, arguments);
  };
}();

exports.leave = leave;

var find =
/*#__PURE__*/
function () {
  var _ref14 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(_ref13) {
    var subjectId, subject;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            subjectId = _ref13.subjectId;
            _context7.next = 3;
            return _models.Subject.findOne({
              _id: subjectId
            });

          case 3:
            subject = _context7.sent;
            return _context7.abrupt("return", subject);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function find(_x7) {
    return _ref14.apply(this, arguments);
  };
}();

exports.find = find;

var addAdmin =
/*#__PURE__*/
function () {
  var _ref16 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(_ref15) {
    var userId, subjectId, update;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            userId = _ref15.userId, subjectId = _ref15.subjectId;
            // validate inputs.
            (0, _validate.validateInput)({
              userId: userId,
              subjectId: subjectId
            }, _validators.SubjectInput.addAdmin);
            _context8.next = 4;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $pull: {
                users: userId
              },
              $addToSet: {
                admins: userId
              }
            });

          case 4:
            update = _context8.sent;

            if (!update) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", 'success');

          case 7:
            return _context8.abrupt("return", 'error');

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function addAdmin(_x8) {
    return _ref16.apply(this, arguments);
  };
}();

exports.addAdmin = addAdmin;