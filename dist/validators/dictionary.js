"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.add = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _fields = require("./fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var add = function add(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    phrase: _fields.phrase,
    definition: _fields.definition
  });

  return schema.validate(data);
};

exports.add = add;

var remove = function remove(data) {
  var schema = _joi["default"].object({
    subjectId: _fields.id,
    definitionIds: _fields.idArray
  });

  return schema.validate(data);
};

exports.remove = remove;