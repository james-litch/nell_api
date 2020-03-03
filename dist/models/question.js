"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var questionSchema = new _mongoose.Schema({
  question: String,
  answers: [{
    answer: String,
    totalChosen: {
      type: Number,
      "default": 0
    },
    _id: false
  }],
  correctAnswer: Number,
  answeredBy: [{
    type: _mongoose.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

var autopopulate = function autopopulate(next) {
  this.populate('answeredBy');
  next();
};

questionSchema.pre('find', autopopulate).pre('findOne', autopopulate);
var Question = (0, _mongoose.model)('Question', questionSchema);
var _default = Question;
exports["default"] = _default;