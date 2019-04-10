"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

/* ==============================================
 * Requirements
 * ============================================== */
var fsx = require('fs-extra');

var helpers = require('../../lib/utils/helpers');

var Veams = require('../../lib/veams');
/* ==============================================
 * Export function
 * ============================================== */

/**
 * Install function of extensions.
 *
 * @param {Array} args - Arguments in console
 */


module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var alias, type, options;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            alias = Veams.DATA.aliases.types;
            type = args[0];

            if (args.length > 1) {
              type = args.shift();
              options = args.join(' ');
            }

            type = alias[type] || type;
            _context.t0 = type;
            _context.next = _context.t0 === Veams.DATA.aliases.types.p ? 7 : _context.t0 === Veams.DATA.aliases.types.bp ? 9 : 22;
            break;

          case 7:
            Veams.runGenerator(Veams.generators.standard, options, 'Project', function () {});
            return _context.abrupt("break", 23);

          case 9:
            if (options) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", helpers.message('yellow', helpers.msg.warning('@veams/cli :: You have to provide a name for your blueprint!')));

          case 11:
            _context.prev = 11;
            helpers.message('cyan', '@veams/cli :: Starting to scaffold a new blueprint  ...');
            _context.next = 15;
            return Veams.runGenerator(Veams.generators.blueprint, "".concat(options, " --config"), 'Blueprint');

          case 15:
            helpers.message('green', helpers.msg.success("Blueprint"));
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t1 = _context["catch"](11);
            helpers.message('red', helpers.msg.error(_context.t1));

          case 21:
            return _context.abrupt("break", 23);

          case 22:
            helpers.message('yellow', helpers.msg.warning('@veams/cli :: Sorry, you do not have defined a valid argument for a new scaffold.'));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 18]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();