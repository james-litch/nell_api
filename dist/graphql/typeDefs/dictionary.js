"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  extend type Mutation{\n     addDefinition(input: AddDefinition): Definition @admin\n     removeDefinitions(input: RemoveDefinitions): String @admin\n  }\n\n  type Definition{\n      id: ID!\n      phrase: String!\n      definition: String!\n  }\n\n  input AddDefinition{\n    subjectId: ID!  \n    phrase: String!\n    definition: String!\n  }\n\n  input RemoveDefinitions{\n    subjectId: ID!\n    definitionIds: [ID!]!\n  }\n\n  \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports["default"] = _default;