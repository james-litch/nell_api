"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controllers = require("../../controllers");

var _default = {
  Query: {},
  Mutation: {
    addDefinition: function addDefinition(root, _ref, _ref2, info) {
      var input = _ref.input;
      var req = _ref2.req;
      return _controllers.Dictionary.add({
        userId: req.userId,
        subjectId: input.subjectId,
        phrase: input.phrase,
        definition: input.definition
      });
    },
    removeDefinitions: function removeDefinitions(root, _ref3, _ref4, info) {
      var input = _ref3.input;
      var req = _ref4.req;
      return _controllers.Dictionary.remove({
        userId: req.userId,
        subjectId: input.subjectId,
        definitionIds: input.definitionIds
      });
    }
  }
};
exports["default"] = _default;