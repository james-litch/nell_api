"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = exports.description = exports.idArray = exports.answers = exports.answer = exports.question = exports.definition = exports.phrase = exports.id = exports.password = exports.email = exports.name = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _joiObjectid = _interopRequireDefault(require("joi-objectid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_joi["default"].objectId = (0, _joiObjectid["default"])(_joi["default"]);

var name = _joi["default"].string().required().min(3).max(254).label('Name');

exports.name = name;

var email = _joi["default"].string().email().required().label('Email');

exports.email = email;

var password = _joi["default"].string().required().min(5).label('Password');

exports.password = password;

var id = _joi["default"].objectId().required().label('ID');

exports.id = id;

var index = _joi["default"].number().integer().required().min(0).label('Index');

exports.index = index;

var phrase = _joi["default"].string().required().min(2).max(256).label('Dictionary Phrase');

exports.phrase = phrase;

var definition = _joi["default"].string().required().min(3).max(256).label('Dictionary Definition');

exports.definition = definition;

var question = _joi["default"].string().required().min(5).max(256).label('Question');

exports.question = question;

var answer = _joi["default"].string().required().min(1).max(256).label('Answer');

exports.answer = answer;

var answers = _joi["default"].array().items(answer).label('Answers');

exports.answers = answers;

var idArray = _joi["default"].array().required().items(id).label('ID Array');

exports.idArray = idArray;

var description = _joi["default"].string().required().min(2).max(256).label('Description');

exports.description = description;