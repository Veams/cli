"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

/* ==============================================
 * Requirements
 * ============================================== */
var fsx = require('fs-extra');

var path = require('path');

var Insert = require('inserter');

var chalk = require('chalk');

var exec = require('child-process-promise').exec;

var Yeoman = require('yeoman-environment');

var updateNotifier = require('update-notifier');

var genPkg = require('../../node_modules/@veams/generator-veams/package.json');

var inserterPkg = require('../../node_modules/inserter/package.json');

var pkg = require('../../package.json');

var helpers = require('./utils/helpers');

var scriptParser = require('./ast/script-parser');

var styleParser = require('./ast/style-parser');

var Env = Yeoman.createEnv();
/* ==============================================
 * Vars/ Configs
 * ============================================== */

var generatorPath = '@veams/generator-veams/generators/';
var Veams = {};
/**
 * Extension ID's
 */

Veams.extensions = {
  generatorId: 'veams-generator',
  componentId: '@veams/component',
  utilityId: '@veams/utility',
  componentsId: 'veams-components',
  methdologyId: 'veams-methodology',
  packageId: 'package'
};
/**
 * Generators
 */

Veams.generators = {
  standard: 'veams:app',
  blueprint: 'veams:blueprint'
};
/**
 * Generator paths
 */

Veams.generatorPath = [{
  path: generatorPath + 'app',
  cmd: Veams.generators.standard
}, {
  path: generatorPath + 'blueprint',
  cmd: Veams.generators.blueprint
}];
/**
 * Veams data
 */

Veams.DATA = {
  pkgManager: getPkgManager,
  projectConfig: getProjectConfig,
  configFile: getConfigFile,
  aliases: {
    cmds: {
      g: 'generate',
      h: 'help',
      i: 'install',
      n: 'new',
      u: 'update',
      v: 'version'
    },
    exts: {
      c: Veams.extensions.componentId,
      vc: Veams.extensions.componentId,
      vu: Veams.extensions.utilityId,
      p: Veams.extensions.packageId,
      u: Veams.extensions.utilityId
    },
    types: {
      bp: 'blueprint',
      c: 'component',
      cu: 'custom',
      p: 'project',
      u: 'utility'
    }
  }
};
/* ==============================================
 * Functions
 * ============================================== */

function getPkgManager() {
  return _getPkgManager.apply(this, arguments);
}

function _getPkgManager() {
  _getPkgManager = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var pkgManager, yarnExists;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pkgManager = 'npm';
            _context.prev = 1;
            _context.next = 4;
            return helpers.fileExists("".concat(process.cwd(), "/yarn.lock"));

          case 4:
            yarnExists = _context.sent;
            pkgManager = yarnExists ? 'yarn' : pkgManager;
            return _context.abrupt("return", pkgManager);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            helpers.message('red', "@veams/cli :: getPkgManager() throws an error: ".concat(_context.t0));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _getPkgManager.apply(this, arguments);
}

function getConfigFile() {
  return JSON.parse(fsx.readFileSync(process.cwd() + '/veams-cli.json', 'utf-8'));
}

function getProjectConfig() {
  try {
    return getConfigFile();
  } catch (error) {
    helpers.message('red', "@veams/cli :: No config file found: ".concat(error));
  }
}
/**
 * Register all generators
 */


Veams.generatorPath.forEach(function (gen) {
  Env.register(require.resolve(gen.path), gen.cmd);
});

function installPkg(_x, _x2) {
  return _installPkg.apply(this, arguments);
}
/**
 * NPM Install function.
 *
 * @param {String} module - A module name
 * @param {String} opts - Options
 */


function _installPkg() {
  _installPkg = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(module, opts) {
    var pkgManager;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Veams.DATA.pkgManager();

          case 2:
            pkgManager = _context2.sent;

            if (!(pkgManager === 'yarn')) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", yarnInstall(module, opts));

          case 7:
            return _context2.abrupt("return", npmInstall(module, opts));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _installPkg.apply(this, arguments);
}

function npmInstall(module, opts) {
  return exec("npm install ".concat(module, " ").concat(opts));
}
/**
 * Yarn Install function.
 *
 * @param {String} module - A module name
 * @param {String} opts - Options
 */


function yarnInstall(module, opts) {
  var options = opts ? "".concat(opts, " --dev") : '--dev';
  return exec("yarn add ".concat(module, " ").concat(options));
}
/**
 * Environment check and generator start.
 *
 * @param {String} generatorName - Name of the generator
 * @param {String} opts - Further options you can pass
 * @param {String} item - Item which is scaffolded
 */


function runGenerator(generatorName, opts, item) {
  return new _promise["default"](function (resolve, reject) {
    Env.run("".concat(generatorName, " ").concat(opts), function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(item);
      }
    });
  });
}
/**
 * Get meta data for blueprint files which are generated to project.
 *
 * @param {String} name - name of blueprint
 * @param {String} type - type of blueprint (component, utility, package)
 */


function getBlueprintConfig(_ref) {
  var name = _ref.name,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'component' : _ref$type;
  var scaffoldPath = type !== 'package' && helpers.getPath(name);
  var scaffoldSrcPath = Veams.DATA.projectConfig().paths.src || 'src';

  if (scaffoldPath.length > 1) {
    name = path.basename(name);
    scaffoldPath = path.join(scaffoldSrcPath, scaffoldPath);
  } else {
    scaffoldPath = Veams.DATA.projectConfig().paths[type] || scaffoldSrcPath;
  }

  return {
    name: name,
    path: "".concat(scaffoldPath),
    type: type
  };
}
/**
 * Use inserter to integrate snippets into project.
 *
 * @param {String} path - path to component
 */


function insertBlueprint(path) {
  var insert = new Insert({
    templates: [path],
    endpoints: Veams.DATA.projectConfig().insertpoints
  });
  insert.render();
}
/**
 * Delete default files
 */


function deleteDefaultFiles(path) {
  helpers.remove("");
}
/**
 * Check for updates
 */


function checkUpdateAvailability() {
  var message = [];
  var genNotifier = updateNotifier({
    pkg: genPkg,
    updateCheckInterval: 1000 * 60 * 60 * 24
  });
  var veamsNotifier = updateNotifier({
    pkg: pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24
  });
  var inserterNotifier = updateNotifier({
    pkg: inserterPkg,
    updateCheckInterval: 1000 * 60 * 60 * 24
  });

  if (genNotifier.update || veamsNotifier.update || inserterNotifier.update) {
    message.push(chalk.gray('@veams/cli :: Update available for: \n\n'));

    if (genNotifier && genNotifier.update) {
      message.push(Veams.extensions.generatorId + chalk.gray(' (') + chalk.green.bold(genNotifier.update.latest) + chalk.gray(') - current: ' + genNotifier.update.current + '\n'));
    }

    if (veamsNotifier && veamsNotifier.update) {
      message.push(pkg.name + chalk.gray(' (') + chalk.green.bold(veamsNotifier.update.latest) + chalk.gray(') - current: ' + veamsNotifier.update.current + '\n'));
    }

    if (inserterNotifier && inserterNotifier.update) {
      message.push(inserterPkg.name + chalk.gray(' (') + chalk.green.bold(inserterNotifier.update.latest) + chalk.gray(') - current: ' + inserterNotifier.update.current + '\n'));
    }

    message.push(chalk.gray('   - Run ' + chalk.magenta('veams update') + ' to update.\n'));
    helpers.message('magenta', helpers.msg.info(message.join(' ')));
  }
}

function getVersions() {
  var message = [];
  message.push(genPkg.name + ': ' + genPkg.version);
  message.push(pkg.name + ': ' + pkg.version);
  message.push(inserterPkg.name + ': ' + inserterPkg.version);
  helpers.message('cyan', message.join('\n'));
}

function getImportFile(type) {
  return "".concat(process.cwd(), "/").concat(Veams.DATA.projectConfig().entries[type]);
}

function readImportFile(_x3) {
  return _readImportFile.apply(this, arguments);
}
/**
 * Get settings.json
 */


function _readImportFile() {
  _readImportFile = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(type) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return helpers.readFile(getImportFile(type));

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            helpers.message('red', helpers.msg.error(_context3.t0));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return _readImportFile.apply(this, arguments);
}

function getComponentSettings(_x4, _x5) {
  return _getComponentSettings.apply(this, arguments);
}
/**
 * Update entry files
 */


function _getComponentSettings() {
  _getComponentSettings = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(scaffoldPath, name) {
    var pathObj, importStylePath, importScriptPath;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return helpers.readFile("".concat(scaffoldPath, "/").concat(name, "/").concat(name, ".settings.json"));

          case 2:
            pathObj = _context4.sent;
            importStylePath = JSON.parse(pathObj).paths.styles;
            importScriptPath = JSON.parse(pathObj).paths.scripts;
            return _context4.abrupt("return", {
              importStylePath: importStylePath,
              importScriptPath: importScriptPath
            });

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getComponentSettings.apply(this, arguments);
}

function updateImportFiles(_x6, _x7) {
  return _updateImportFiles.apply(this, arguments);
}
/* ==============================================
 * Export
 * ============================================== */


function _updateImportFiles() {
  _updateImportFiles = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(importStylePath, importScriptPath) {
    var styleFile, styleContent, stylePath, updatedStyleFile, scriptFile, scriptContent, scriptPath, updatedScriptFile;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            if (!importStylePath) {
              _context5.next = 12;
              break;
            }

            styleFile = getImportFile('style');
            _context5.next = 5;
            return helpers.readFile(styleFile);

          case 5:
            styleContent = _context5.sent;
            stylePath = "".concat(helpers.resolveImportPath(styleFile, importStylePath), "/").concat(path.basename(importStylePath));
            _context5.next = 9;
            return styleParser(styleContent, stylePath);

          case 9:
            updatedStyleFile = _context5.sent;
            _context5.next = 12;
            return helpers.writeFile(styleFile, updatedStyleFile);

          case 12:
            if (!importScriptPath) {
              _context5.next = 24;
              break;
            }

            scriptFile = getImportFile('script');
            _context5.next = 16;
            return helpers.readFile(scriptFile);

          case 16:
            scriptContent = _context5.sent;
            scriptPath = "".concat(helpers.resolveImportPath(scriptFile, importScriptPath), "/").concat(path.basename(importScriptPath));
            scriptPath = scriptPath.charAt(0) !== '.' ? "./".concat(scriptPath) : scriptPath;
            _context5.next = 21;
            return scriptParser(scriptContent, {
              clName: helpers.capitalizeFirstLetter(helpers.toCamelCase(path.basename(scriptPath))),
              path: scriptPath
            });

          case 21:
            updatedScriptFile = _context5.sent;
            _context5.next = 24;
            return helpers.writeFile(scriptFile, updatedScriptFile);

          case 24:
            _context5.next = 29;
            break;

          case 26:
            _context5.prev = 26;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", helpers.message('red', helpers.msg.error('updateImportFiles() could not executed: \n' + _context5.t0)));

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 26]]);
  }));
  return _updateImportFiles.apply(this, arguments);
}

module.exports = {
  DATA: Veams.DATA,
  generators: Veams.generators,
  extensions: Veams.extensions,
  checkUpdateAvailability: checkUpdateAvailability,
  deleteDefaultFiles: deleteDefaultFiles,
  getBlueprintConfig: getBlueprintConfig,
  getComponentSettings: getComponentSettings,
  getImportFile: getImportFile,
  getVersions: getVersions,
  insertBlueprint: insertBlueprint,
  installPkg: installPkg,
  npmInstall: npmInstall,
  readImportFile: readImportFile,
  runGenerator: runGenerator,
  updateImportFiles: updateImportFiles
};