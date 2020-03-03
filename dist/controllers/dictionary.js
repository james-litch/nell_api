"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = exports.remove = exports.add = void 0;

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
    var userId, subjectId, phrase, definition, update;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = _ref.userId, subjectId = _ref.subjectId, phrase = _ref.phrase, definition = _ref.definition;
            // validate inputs
            (0, _validate.validateInput)({
              subjectId: subjectId,
              phrase: phrase,
              definition: definition
            }, _validators.DictionaryInput.add); // add definition to dictionary.

            _context.next = 4;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $addToSet: {
                dictionary: {
                  phrase: phrase,
                  definition: definition
                }
              }
            }, {
              "new": true
            });

          case 4:
            update = _context.sent;
            console.log(update);
            return _context.abrupt("return", {
              phrase: phrase,
              definition: definition
            });

          case 7:
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
    var userId, subjectId, definitionIds, update;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = _ref3.userId, subjectId = _ref3.subjectId, definitionIds = _ref3.definitionIds;
            // validate inputs
            (0, _validate.validateInput)({
              subjectId: subjectId,
              definitionIds: definitionIds
            }, _validators.DictionaryInput.remove); // remove definition from dictionary.

            _context2.next = 4;
            return _models.Subject.findOneAndUpdate({
              _id: subjectId
            }, {
              $pull: {
                dictionary: {
                  _id: {
                    $in: definitionIds
                  }
                }
              }
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

var find = function find() {};

exports.find = find;