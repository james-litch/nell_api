"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controllers = require("../../controllers");

var _default = {
  Query: {
    me: function me(root, _ref, _ref2, info) {
      var input = _ref.input;
      var req = _ref2.req;
      return _controllers.User.getUser({
        userId: req.user.id
      });
    }
  },
  Mutation: {
    signUp: function signUp(root, _ref3, context, info) {
      var input = _ref3.input;
      return _controllers.User.signUp({
        name: input.name,
        email: input.email,
        password: input.password
      });
    },
    signIn: function signIn(root, _ref4, context, info) {
      var input = _ref4.input;
      return _controllers.User.signIn({
        email: input.email,
        password: input.password
      });
    },
    invalidateToken: function invalidateToken(root, args, _ref5, info) {
      var req = _ref5.req;
      return _controllers.User.endSession({
        userId: req.user.id
      });
    },
    changePassword: function changePassword(root, _ref6, _ref7, info) {
      var input = _ref6.input;
      var req = _ref7.req;
      return _controllers.User.changePassword({
        userId: req.user.id,
        oldPassword: input.oldPassword,
        newPassword: input.newPassword
      });
    }
  }
};
exports["default"] = _default;