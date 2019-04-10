"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

/* ==============================================
 * Requirements
 * ============================================== */
var fs = require('fs-extra');

var chalk = require('chalk');

var Veams = require('../../lib/veams');

var helpers = require('../../lib/utils/helpers');
/* ==============================================
 * Helper functions
 * ============================================== */


function installComponent(_x) {
  return _installComponent.apply(this, arguments);
}
/* ==============================================
 * Export
 * ============================================== */

/**
 * Install function of extensions.
 *
 * @param {Array} args - Arguments in console
 */


function _installComponent() {
  _installComponent = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(_ref) {
    var registryName, _ref$options, options, name, _ref$type, type, config, src, dest;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            registryName = _ref.registryName, _ref$options = _ref.options, options = _ref$options === void 0 ? '' : _ref$options, name = _ref.name, _ref$type = _ref.type, type = _ref$type === void 0 ? 'component' : _ref$type;

            if (name) {
              _context2.next = 4;
              break;
            }

            helpers.message('yellow', helpers.msg.warning('Please provide the name!'));
            return _context2.abrupt("return");

          case 4:
            try {
              config = Veams.getBlueprintConfig({
                name: name,
                type: type
              });
              src = "".concat(process.cwd(), "/node_modules/").concat(registryName);
              dest = "".concat(config.path, "/").concat(config.name);
              Veams.installPkg(registryName, options).then(function () {
                return helpers.copy({
                  src: src,
                  dest: dest
                });
              }).then(function () {
                var stylePath = "".concat(dest, "/styles/").concat(name);
                var scriptPath = fs.pathExistsSync("".concat(dest, "/scripts/").concat(name, ".js")) ? "".concat(dest, "/scripts/").concat(name) : '';
                return Veams.updateImportFiles(stylePath, scriptPath);
              }).then(function () {
                Veams.insertBlueprint(dest);
                helpers.message('green', helpers.msg.success(registryName));
              });
            } catch (err) {
              helpers.message('red', helpers.msg.error(err));
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _installComponent.apply(this, arguments);
}

module.exports =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var extArgument, typeArgument, argument, options, registryName, component, vuName, pName, customPackageName, src, type, name, config, dest;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            extArgument = Veams.DATA.aliases.exts;
            typeArgument = Veams.DATA.aliases.types;
            argument = args[0];
            options = '';
            registryName = '';
            Veams.DATA.projectConfig();

            if (args.length > 1) {
              argument = args.shift();
              options = args.join(' ');
            }

            argument = extArgument[argument] || typeArgument[argument] || argument;
            _context.t0 = argument;
            _context.next = _context.t0 === Veams.DATA.aliases.exts.vc ? 11 : _context.t0 === Veams.DATA.aliases.exts.vu ? 18 : _context.t0 === Veams.DATA.aliases.exts.p ? 25 : _context.t0 === Veams.DATA.aliases.types.bp ? 36 : 46;
            break;

          case 11:
            component = args.shift();
            registryName = Veams.extensions.componentId + '-' + component;
            options = args.join(' ');
            helpers.message('cyan', '@veams/cli :: Downloading ' + registryName + ' ...');
            _context.next = 17;
            return installComponent({
              registryName: registryName,
              options: options,
              name: component,
              type: 'component'
            });

          case 17:
            return _context.abrupt("break", 47);

          case 18:
            vuName = args.shift();
            registryName = Veams.extensions.utilityId + '-' + vuName;
            options = args.join(' ');
            helpers.message('cyan', '@veams/cli :: Downloading ' + registryName + ' ...');
            _context.next = 24;
            return installComponent({
              registryName: registryName,
              options: options,
              name: vuName,
              type: 'utility'
            });

          case 24:
            return _context.abrupt("break", 47);

          case 25:
            pName = args.shift();
            customPackageName = args.shift();
            registryName = pName;
            options = args.join(' ');

            if (customPackageName) {
              _context.next = 32;
              break;
            }

            helpers.message('red', "\n@veams/cli :: Please provide a name for your external package as last parameter like:\n".concat(chalk.italic.bold('  veams install package my-npm-accordion accordion'), "\n"));
            return _context.abrupt("return");

          case 32:
            helpers.message('cyan', '@veams/cli :: Downloading ' + registryName + ' ...');
            _context.next = 35;
            return installComponent({
              registryName: registryName,
              options: options,
              name: customPackageName,
              type: 'package'
            });

          case 35:
            return _context.abrupt("break", 47);

          case 36:
            src = args.shift();
            type = args[0] || 'component';
            name = helpers.getLastFolder(bpPath);
            config = Veams.getBlueprintConfig({
              name: name,
              type: type
            });
            dest = "".concat(config.path, "/").concat(config.name);
            helpers.message('cyan', '@veams/cli :: Starting to install a local blueprint  ...');
            _context.next = 44;
            return helpers.copy({
              src: src,
              dest: dest
            });

          case 44:
            Veams.insertBlueprint(dest);
            return _context.abrupt("break", 47);

          case 46:
            console.log('@veams/cli :: Sorry, you do not have defined a valid installation argument.');

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();