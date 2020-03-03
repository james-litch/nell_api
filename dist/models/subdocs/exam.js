"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var Exam = new _mongoose.Schema({
  name: String,
  description: String,
  questions: [{
    type: _mongoose.ObjectId,
    ref: 'Question'
  }]
}, {
  timestamps: true
});
var _default = Exam;
exports["default"] = _default;