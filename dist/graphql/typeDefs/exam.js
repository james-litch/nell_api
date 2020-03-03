"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  extend type Query{\n    findExam(input: FindExam): Exam! @inSubject\n  }\n\n  extend type Mutation{\n     createExam(input: CreateExam): String! @admin\n     removeExams(input: RemoveExams): String! @admin\n  }\n\n  type Exam{\n    id:ID!\n    name: String!\n    description: String!\n    questions: [Question!]!\n  }\n\n  input CreateExam{\n    subjectId: ID!\n    name: String!\n    description: String!\n    questions: [ID!]!\n  }\n\n  input RemoveExams{\n    subjectId: ID!\n    examIds: [ID!]!\n  }\n\n  input FindExam{\n    subjectId: ID!\n    examId: ID!\n  }\n\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports["default"] = _default;