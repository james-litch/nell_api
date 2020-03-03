"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  extend type Query{\n    findSubject(input: FindSubject): Subject! @inSubject\n  }\n\n  extend type Mutation{\n     createSubject(input: CreateSubject): Subject @auth\n     joinSubject(input: JoinSubject): Subject @auth  \n     deleteSubject(input: DeleteSubject): String! @admin\n     leaveSubject(input: LeaveSubject): String! @inSubject\n\n     subjectFeedback(input: SubjectFeedback): String! @inSubject\n     clearFeedback(input: ClearFeedback): String! @admin\n\n     addAdmin(input: AddAdmin): String! @admin\n  }\n\n  type Subject{\n    id: ID!\n    name: String!\n    admins: [User!]\n    users: [User!]\n    dictionary: [Definition!]\n    exams: [Exam!]\n    questions:[Question!]\n    currentQuestions:[Question!]\n    feedback: [String!]\n    createdAt: String!\n    updatedAt: String!\n  }\n\n  input CreateSubject{\n    subjectName: String! \n    password: String!\n  }\n\n  input JoinSubject{\n    subjectId: ID! \n    password: String!\n  }\n\n  input SubjectFeedback{\n    subjectId: ID!\n    question: String!\n  }\n\n  input ClearFeedback{\n    subjectId: ID!\n  }\n\n  input DeleteSubject{\n    subjectId: ID!\n  }\n\n  input LeaveSubject{\n    subjectId: ID!\n  }\n\n  input FindSubject{\n    subjectId: ID!\n  }\n\n  input AddAdmin{\n    subjectId: ID!\n    userId: ID!\n  }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports["default"] = _default;