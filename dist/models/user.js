"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = require("bcryptjs");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userSchema = new _mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: function validator(email) {
        return User.doesntExist({
          email: email
        });
      },
      message: function message(_ref) {
        var value = _ref.value;
        return "".concat(value, " has already been taken.");
      }
    }
  },
  name: String,
  password: String,
  subjects: [{
    subject: {
      type: _mongoose.ObjectId,
      ref: 'Subject'
    },
    admin: Boolean,
    _id: false
  }],
  tokenCount: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
}); // checks password against hashed password.

userSchema.methods.matchesPassword = function (password) {
  return (0, _bcryptjs.compare)(password, this.password);
}; // populate document after find operation.
// userSchema.pre('find', function (next) {
//   this.populate('subjects.subject');
//   next();
// });
// populate document after find operation.


userSchema.pre('findOne', function (next) {
  this.populate('subjects.subject');
  next();
}); // hash password before saving user.

userSchema.pre('save',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
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
    return _ref2.apply(this, arguments);
  };
}()); // hash password after its been updated

userSchema.pre('updateOne',
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(next) {
    var docToUpdate, newPassword;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.model.findOne(this.getQuery());

          case 2:
            docToUpdate = _context2.sent;

            if (!(docToUpdate.password !== this._update.$set.password)) {
              _context2.next = 8;
              break;
            }

            _context2.next = 6;
            return (0, _bcryptjs.hash)(this._update.$set.password, 10);

          case 6:
            newPassword = _context2.sent;
            this._update.$set.password = newPassword;

          case 8:
            next();

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}()); // static method for determining whether a field is in the database already

userSchema.statics.doesntExist =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(options) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.countDocuments(options);

          case 2:
            _context3.t0 = _context3.sent;
            return _context3.abrupt("return", _context3.t0 === 0);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var User = (0, _mongoose.model)('User', userSchema);
var _default = User;
exports["default"] = _default;