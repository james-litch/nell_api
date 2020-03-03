"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.answer = exports.removeCurrent = exports.addCurrent = exports.remove = exports.add = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _fields = require("./fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var add = function add(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    question: _fields.question,
    answers: _fields.answers,
    correctAnswer: _fields.index
  });

  return schema.validate(data);
};

exports.add = add;

var remove = function remove(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    questionIds: _fields.idArray
  });

  return schema.validate(data);
};

exports.remove = remove;

var addCurrent = function addCurrent(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    questionId: _fields.id
  });

  return schema.validate(data);
};

exports.addCurrent = addCurrent;

var removeCurrent = function removeCurrent(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id
  });

  return schema.validate(data);
};

exports.removeCurrent = removeCurrent;

var answer = function answer(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    questionId: _fields.id,
    answerIndex: _fields.index
  });

  return schema.validate(data);
};

exports.answer = answer;