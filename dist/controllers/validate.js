"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSubject = exports.isUser = exports.matchesPassword = exports.validateInput = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _models = require("../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var INVALID_CREDENTIALS = 'Invalid credentials';
var AUTH_ERROR = 'UNAUTHENTICATED';

var validateInput = function validateInput(data, validator) {
  // validate inputs
  var _validator = validator(data),
      error = _validator.error;

  if (error) throw new _apolloServerExpress.UserInputError(error.details[0].message);
};

exports.validateInput = validateInput;

var matchesPassword =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(object, password) {
    var match;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return object.matchesPassword(password);

          case 2:
            match = _context.sent;

            if (match) {
              _context.next = 5;
              break;
            }

            throw new _apolloServerExpress.AuthenticationError(INVALID_CREDENTIALS);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function matchesPassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.matchesPassword = matchesPassword;

var isUser =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(filter) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.User.findOne(filter);

          case 2:
            user = _context2.sent;

            if (user) {
              _context2.next = 5;
              break;
            }

            throw new _apolloServerExpress.AuthenticationError(INVALID_CREDENTIALS);

          case 5:
            return _context2.abrupt("return", user);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function isUser(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isUser = isUser;

var isSubject =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(subjectId) {
    var subject;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.Subject.findOne({
              _id: subjectId
            });

          case 2:
            subject = _context3.sent;

            if (subject) {
              _context3.next = 5;
              break;
            }

            throw new _apolloServerExpress.UserInputError(INVALID_CREDENTIALS);

          case 5:
            return _context3.abrupt("return", subject);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isSubject(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.isSubject = isSubject;