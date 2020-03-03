"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _default = new _mongoose.Schema({
  phrase: String,
  definition: String
});

exports["default"] = _default;