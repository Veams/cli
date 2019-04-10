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
 * Export function
 * ============================================== */

/**
 * Generate extensions.
 *
 * @param {Array} args - Arguments in bash
 */


module.exports =
/*#__PURE__*/
function () {
  var _generate = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var alias, projectConfig, projectType, skip, type, name, config, fullPath, skipFilesOption, importPaths;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            alias = Veams.DATA.aliases.types;
            projectConfig = Veams.DATA.projectConfig();
            projectType = projectConfig.projectType;
            skip = args.indexOf('--skip-imports') !== -1 || args.indexOf('--si') !== -1;
            type = args[0];

            if (projectConfig.blueprints && projectConfig.blueprints[type]) {
              skip = projectConfig.blueprints[type].skipImports || skip;
            }

            if (!(args.length > 1)) {
              _context.next = 11;
              break;
            }

            type = args.shift();
            name = args.shift();
            _context.next = 13;
            break;

          case 11:
            helpers.message('gray', helpers.msg.help('You have to provide the type and name for the blueprint!'));
            return _context.abrupt("return");

          case 13:
            type = alias[type] || type;

            if (type) {
              _context.next = 17;
              break;
            }

            helpers.message('yellow', helpers.msg.warning('Sorry, you do not have defined a valid argument for adding a new blueprint.'));
            return _context.abrupt("return");

          case 17:
            helpers.message('cyan', '@veams/cli :: Starting to scaffold a new ' + type + '  ...');
            config = Veams.getBlueprintConfig({
              name: name,
              type: type
            });
            fullPath = "".concat(config.path, "/").concat(config.name);
            _context.prev = 20;
            skipFilesOption = skip ? '--skipDefaults' : '';
            _context.next = 24;
            return Veams.runGenerator(Veams.generators.blueprint, "".concat(config.type, " ").concat(config.name, " ").concat(config.path, " --config ").concat(skipFilesOption), "".concat(config.name));

          case 24:
            if (skip) {
              _context.next = 34;
              break;
            }

            _context.next = 27;
            return Veams.getComponentSettings(config.path, config.name);

          case 27:
            importPaths = _context.sent;
            _context.next = 30;
            return Veams.updateImportFiles(importPaths.importStylePath, importPaths.importScriptPath);

          case 30:
            Veams.insertBlueprint(fullPath);

            if (!(projectType === 'single-page-app')) {
              _context.next = 34;
              break;
            }

            _context.next = 34;
            return Veams.deleteDefaultFiles(config.path);

          case 34:
            helpers.message('green', "@veams/cli :: ".concat(config.name, " was successfully created in ").concat(config.path, "/").concat(config.name));
            _context.next = 40;
            break;

          case 37:
            _context.prev = 37;
            _context.t0 = _context["catch"](20);
            helpers.message('red', helpers.msg.error(_context.t0));

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[20, 37]]);
  }));

  function generate(_x) {
    return _generate.apply(this, arguments);
  }

  return generate;
}();