"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = require("bcryptjs");

var _subdocs = require("./subdocs");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var subjectSchema = new _mongoose.Schema({
  name: String,
  password: String,
  users: [{
    type: _mongoose.ObjectId,
    ref: 'User'
  }],
  admins: [{
    type: _mongoose.ObjectId,
    ref: 'User'
  }],
  questions: [{
    type: _mongoose.ObjectId,
    ref: 'Question'
  }],
  currentQuestions: [{
    type: _mongoose.ObjectId,
    ref: 'Question'
  }],
  exams: [_subdocs.Exam],
  dictionary: [_subdocs.Definition],
  feedback: [{
    type: String
  }]
}, {
  timestamps: true
}); // hash password before saving user.

subjectSchema.pre('save',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.isModified('password')) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return (0, _bcryptjs.hash)(this.password, 10);

          case 3:
            this.password = _context.sent;

          case 4:
            next();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var autopopulate = function autopopulate(next) {
  this.populate('users');
  this.populate('admins');
  this.populate('questions');
  this.populate('exams.questions');
  this.populate('currentQuestions');
  next();
}; // populate document after find operation.


subjectSchema.pre('find', autopopulate).pre('findOne', autopopulate).pre('update', autopopulate).pre('save', autopopulate); // populate document after create operation.

subjectSchema.post('save', function (doc, next) {
  doc.populate('users').populate('admins').populate('questions').populate('exams.questions').populate('currentQuestions').execPopulate(function () {
    next();
  });
});
subjectSchema.post('update', function (doc, next) {
  doc.populate('users').populate('admin').populate('questions').populate('exams.questions').populate('currentQuestions').execPopulate(function () {
    next();
  });
}); // checks password against hashed password.

subjectSchema.methods.matchesPassword = function (password) {
  return (0, _bcryptjs.compare)(password, this.password);
};

var Subject = (0, _mongoose.model)('Subject', subjectSchema);
var _default = Subject;
exports["default"] = _default;