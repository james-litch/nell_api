"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePassword = exports.signIn = exports.signUp = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _fields = require("./fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signUp = function signUp(data) {
  var schema = _joi["default"].object({
    name: _fields.name,
    email: _fields.email,
    password: _fields.password
  });

  return schema.validate(data);
};

exports.signUp = signUp;

var signIn = function signIn(data) {
  var schema = _joi["default"].object({
    email: _fields.email,
    password: _fields.password
  });

  return schema.validate(data);
};

exports.signIn = signIn;

var changePassword = function changePassword(data) {
  var schema = _joi["default"].object({
    oldPassword: _fields.password,
    newPassword: _fields.password
  });

  return schema.validate(data);
};

exports.changePassword = changePassword;