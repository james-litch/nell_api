"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  extend type Query{\n    findQuestion(input: FindQuestion): Question! @inSubject\n  }\n\n  extend type Mutation{\n     addQuestion(input: AddQuestion): Question @admin\n     removeQuestions(input: RemoveQuestions): String @admin\n\n     addCurrentQuestion(input: CurrentQuestion): String! @admin\n     removeCurrentQuestion(input: RemoveCurrentQuestion): String! @admin\n\n     answerQuestion(input: AnswerQuestion): Question! @inSubject\n  }\n\n  type Question{\n      id: ID!\n      question: String!\n      correctAnswer: String!\n      answers: [Answer!]!\n      answeredBy: [User!]\n  }\n\n  type Answer{\n      answer: String!\n      totalChosen: Int!\n  }\n\n  input AddQuestion{\n    subjectId: ID!  \n    question: String!\n    answers:[String!]!\n    correctAnswer: Int!\n  }\n\n  input RemoveQuestions{\n    subjectId: ID!\n    questionIds: [ID!]!\n  }\n\n  input CurrentQuestion{\n    subjectId: ID!\n    questionId: ID!\n  }\n\n  input RemoveCurrentQuestion{\n    subjectId: ID!\n  }\n\n  input AnswerQuestion{\n    subjectId: ID!\n    questionId: ID!\n    answer: Int!\n  }\n\n  input FindQuestion{\n    subjectId: ID!\n    questionId: ID!\n  }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports["default"] = _default;