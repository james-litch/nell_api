"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var _subject = _interopRequireDefault(require("./subject"));

var _dictionary = _interopRequireDefault(require("./dictionary"));

var _exam = _interopRequireDefault(require("./exam"));

var _question = _interopRequireDefault(require("./question"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = [_user["default"], _subject["default"], _dictionary["default"], _exam["default"], _question["default"]];
exports["default"] = _default;