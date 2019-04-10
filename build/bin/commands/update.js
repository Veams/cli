"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

/* ==============================================
 * Requirements
 * ============================================== */
var Veams = require('../../lib/veams');

var helpers = require('../../lib/utils/helpers');
/* ==============================================
 * Export
 * ============================================== */

/**
 * Update function of extensions.
 */


module.exports =
/*#__PURE__*/
function () {
  var _update = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            helpers.message('cyan', '@veams/cli :: Updating Veams ...');
            _context.prev = 1;
            _context.next = 4;
            return Veams.npmInstall('@veams/cli -g');

          case 4:
            helpers.message('green', helpers.msg.success('Veams'));
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            helpers.message('red', helpers.msg.error(_context.t0));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  function update() {
    return _update.apply(this, arguments);
  }

  return update;
}();