"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAdmin = exports.clearFeedback = exports.feedback = exports.remove = exports.leave = exports.join = exports.create = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _fields = require("./fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var create = function create(data) {
  var schema = _joi["default"].object({
    subjectName: _fields.name,
    password: _fields.password
  });

  return schema.validate(data);
};

exports.create = create;

var join = function join(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    password: _fields.password
  });

  return schema.validate(data);
};

exports.join = join;

var remove = function remove(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id
  });

  return schema.validate(data);
};

exports.remove = remove;

var leave = function leave(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id
  });

  return schema.validate(data);
};

exports.leave = leave;

var feedback = function feedback(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    question: _fields.question
  });

  return schema.validate(data);
};

exports.feedback = feedback;

var clearFeedback = function clearFeedback(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id
  });

  return schema.validate(data);
};

exports.clearFeedback = clearFeedback;

var addAdmin = function addAdmin(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    userId: _fields.id
  });

  return schema.validate(data);
};

exports.addAdmin = addAdmin;