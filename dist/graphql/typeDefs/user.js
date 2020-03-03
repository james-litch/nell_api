"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n    extend type Query{\n        me: User @auth\n    }\n\n    extend type Mutation{\n        signUp(input: SignUp): AuthResponse\n        signIn(input: SignIn): AuthResponse\n        invalidateToken: String! @auth\n        changePassword(input: ChangePassword): String! @auth\n    }\n\n    type User{\n        id: ID!\n        email: String!\n        name: String!\n        subjects: [UserSubject!]\n        createdAt: String!\n        updatedAt: String!\n    }\n\n    type Tokens {\n        accessToken: String!\n        refreshToken: String!\n    }\n\n    type UserSubject{\n        subject: Subject!\n        admin: Boolean\n    }\n\n    input SignUp{\n        name: String!\n        email: String!\n        password: String!\n    }\n\n    input SignIn{\n        email: String!\n        password: String!\n    }\n\n    input ChangePassword{\n        oldPassword: String!\n        newPassword: String!\n    }\n\n    type AuthResponse{\n        tokens: Tokens!\n        user: User!\n    }\n    \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports["default"] = _default;