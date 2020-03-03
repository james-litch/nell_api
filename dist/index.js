"use strict";

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _typeDefs = _interopRequireDefault(require("./graphql/typeDefs"));

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

var _directives = _interopRequireDefault(require("./graphql/directives"));

var _controllers = require("./controllers");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var app, server, port;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _mongoose["default"].connect("mongodb+srv://".concat(_config.DB_USERNAME, ":").concat(_config.DB_PASSWORD, "@cluster0-ovg6n.mongodb.net/").concat(_config.DB_NAME, "?retryWrites=true&w=majority"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
          });

        case 3:
          app = (0, _express["default"])();
          app.use(_controllers.Tokens.persist);
          server = new _apolloServerExpress.ApolloServer({
            typeDefs: _typeDefs["default"],
            resolvers: _resolvers["default"],
            schemaDirectives: _directives["default"],
            playground: true,
            introspection: true,
            context: function context(_ref2) {
              var req = _ref2.req,
                  res = _ref2.res;
              return {
                req: req,
                res: res
              };
            }
          });
          server.applyMiddleware({
            app: app
          });
          port = _config.PORT || 3000;
          server.listen({
            port: process.env.PORT || 4000
          }).then(function (_ref3) {
            var url = _ref3.url;
            console.log("\uD83D\uDE80 Server ready at ".concat(url));
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 11]]);
}))();