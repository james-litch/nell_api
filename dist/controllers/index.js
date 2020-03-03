"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tokens = exports.Validate = exports.Dictionary = exports.Exam = exports.Question = exports.Subject = exports.User = void 0;

var User = _interopRequireWildcard(require("./user"));

exports.User = User;

var Subject = _interopRequireWildcard(require("./subject"));

exports.Subject = Subject;

var Question = _interopRequireWildcard(require("./question"));

exports.Question = Question;

var Exam = _interopRequireWildcard(require("./exam"));

exports.Exam = Exam;

var Dictionary = _interopRequireWildcard(require("./dictionary"));

exports.Dictionary = Dictionary;

var Validate = _interopRequireWildcard(require("./validate"));

exports.Validate = Validate;

var Tokens = _interopRequireWildcard(require("./token"));

exports.Tokens = Tokens;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }