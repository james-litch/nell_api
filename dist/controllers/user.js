"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePassword = exports.endSession = exports.getUser = exports.signIn = exports.signUp = void 0;

var _validators = require("../validators");

var _models = require("../models");

var _validate = require("./validate");

var _token = require("./token");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var name, email, password, user, tokens;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = _ref.name, email = _ref.email, password = _ref.password;
            // validate inputs.
            (0, _validate.validateInput)({
              name: name,
              email: email,
              password: password
            }, _validators.UserInput.signUp); // create user.

            _context.next = 4;
            return _models.User.create({
              name: name,
              email: email,
              password: password
            });

          case 4:
            user = _context.sent;
            // generate JWT refresh and access tokens.
            tokens = (0, _token.generate)((0, _token.tokenBody)(user));
            return _context.abrupt("return", {
              user: user,
              tokens: tokens
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signUp(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref3) {
    var email, password, user, tokens;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = _ref3.email, password = _ref3.password;
            // validate inputs.
            (0, _validate.validateInput)({
              email: email,
              password: password
            }, _validators.UserInput.signIn); // check email exists.

            _context2.next = 4;
            return (0, _validate.isUser)({
              email: email
            });

          case 4:
            user = _context2.sent;
            _context2.next = 7;
            return (0, _validate.matchesPassword)(user, password);

          case 7:
            // generate JWT refresh and access tokens.
            tokens = (0, _token.generate)((0, _token.tokenBody)(user));
            return _context2.abrupt("return", {
              user: user,
              tokens: tokens
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signIn(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var endSession =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref5) {
    var userId, update;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = _ref5.userId;
            _context3.next = 3;
            return _models.User.findOneAndUpdate({
              _id: userId
            }, {
              $inc: {
                tokenCount: 1
              }
            }, function (err, doc) {
              if (err) throw new Error(err);
            });

          case 3:
            update = _context3.sent;
            return _context3.abrupt("return", 'success');

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function endSession(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.endSession = endSession;

var changePassword =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref7) {
    var userId, oldPassword, newPassword, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = _ref7.userId, oldPassword = _ref7.oldPassword, newPassword = _ref7.newPassword;
            // validate inputs.
            (0, _validate.validateInput)({
              oldPassword: oldPassword,
              newPassword: newPassword
            }, _validators.UserInput.changePassword); // find user.

            _context4.next = 4;
            return (0, _validate.isUser)({
              _id: userId
            });

          case 4:
            user = _context4.sent;
            _context4.next = 7;
            return (0, _validate.matchesPassword)(user, oldPassword);

          case 7:
            _context4.next = 9;
            return user.updateOne({
              $set: {
                password: newPassword
              }
            });

          case 9:
            // invalidate token (increases token count).
            endSession({
              userId: userId
            });
            return _context4.abrupt("return", 'success');

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function changePassword(_x4) {
    return _ref8.apply(this, arguments);
  };
}();

exports.changePassword = changePassword;

var getUser =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref9) {
    var userId, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = _ref9.userId;
            _context5.next = 3;
            return (0, _validate.isUser)({
              _id: userId
            });

          case 3:
            user = _context5.sent;
            return _context5.abrupt("return", user);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getUser(_x5) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getUser = getUser;