"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _admin = _interopRequireDefault(require("./admin"));

var _inSubject = _interopRequireDefault(require("./inSubject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  auth: _auth["default"],
  admin: _admin["default"],
  inSubject: _inSubject["default"]
};
exports["default"] = _default;