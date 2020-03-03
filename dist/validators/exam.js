"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = exports.remove = exports.create = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _fields = require("./fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var create = function create(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    name: _fields.name,
    description: _fields.description,
    questions: _fields.idArray
  });

  return schema.validate(data);
};

exports.create = create;

var remove = function remove(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    examIds: _fields.idArray
  });

  return schema.validate(data);
};

exports.remove = remove;

var find = function find(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    examId: _fields.id
  });

  return schema.validate(data);
};

exports.find = find;