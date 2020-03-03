"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refresh = exports.tokenBody = exports.persist = exports.validate = exports.generate = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _models = require("../models");

var _config = require("../../config");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var generate = function generate(_ref) {
  var accessBody = _ref.accessBody,
      refreshBody = _ref.refreshBody;
  var refreshToken = (0, _jsonwebtoken.sign)(refreshBody, _config.JWT_KEY, {
    expiresIn: _config.REFRESH_TOKEN_LIFE
  });
  var accessToken = (0, _jsonwebtoken.sign)(accessBody, _config.JWT_KEY, {
    expiresIn: _config.ACCESS_TOKEN_LIFE
  });
  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  };
}; // generate the jwt body for a populated user query


exports.generate = generate;

var tokenBody = function tokenBody(user) {
  var subjectsObj = user.subjects.map(function (item) {
    return {
      id: item.subject._id,
      admin: item.admin
    };
  });
  var refreshBody = {
    id: user.id,
    subjects: subjectsObj,
    tokenCount: user.tokenCount
  };
  var accessBody = {
    id: user.id,
    subjects: subjectsObj
  };
  return {
    accessBody: accessBody,
    refreshBody: refreshBody
  };
};

exports.tokenBody = tokenBody;

var validate = function validate(token) {
  var validatedToken; // see if token is valid.

  try {
    validatedToken = (0, _jsonwebtoken.verify)(token, _config.JWT_KEY);
  } catch (err) {
    validatedToken = null;
  }

  return validatedToken;
};

exports.validate = validate;

var persist =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var refresh, access, decodedAccess, decodedRefresh, user, accessBody, refreshBody, _generate, accessToken, refreshToken;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // get token headers.
            refresh = req.headers['refresh-token'];
            access = req.headers['access-token']; // if token headers are empty skip.

            if (!(!access && !refresh)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", next());

          case 4:
            // validate access token.
            decodedAccess = validate(access);

            if (!decodedAccess) {
              _context.next = 8;
              break;
            }

            req.user = decodedAccess;
            return _context.abrupt("return", next());

          case 8:
            decodedRefresh = validate(refresh);

            if (!decodedRefresh) {
              _context.next = 20;
              break;
            }

            _context.next = 12;
            return _models.User.findById(decodedRefresh.id);

          case 12:
            user = _context.sent;

            if (!(!user || decodedRefresh.tokenCount !== user.tokenCount)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", next());

          case 15:
            req.user = decodedRefresh;
            accessBody = {
              id: user.id,
              subjects: user.subjects
            };
            refreshBody = {
              id: user.id,
              subjects: user.subjects,
              count: user.tokenCount
            };
            _generate = generate({
              accessBody: accessBody,
              refreshBody: refreshBody
            }), accessToken = _generate.accessToken, refreshToken = _generate.refreshToken;
            res.set({
              'Access-Control-Expose-Headers': 'access-token,refresh-token',
              'access-token': accessToken,
              'refresh-token': refreshToken
            });

          case 20:
            return _context.abrupt("return", next());

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function persist(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); // TODO: probably wont work. may not need.


exports.persist = persist;

var refresh = function refresh(user, req, res, next) {
  var _generate2 = generate(tokenBody(user)),
      accessToken = _generate2.accessToken,
      refreshToken = _generate2.refreshToken;

  res.set({
    'Access-Control-Expose-Headers': 'access-token,refresh-token',
    'access-token': accessToken,
    'refresh-token': refreshToken
  });
  next();
};

exports.refresh = refresh;