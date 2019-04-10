"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

/* ==============================================
 * Requirements
 * ============================================== */
var path = require('path');

var chalk = require('chalk');

var fsx = require('fs-extra');

var mkdirp = require('mkdirp');
/* ==============================================
 * Variables
 * ============================================== */


var marker = '\n==================================================\n';
/**
 * Represents a helpers object.
 * @module helpers object
 *
 * @author Sebastian Fitzner
 */

var helpers = {};
/**
 * Messages
 */

helpers.msg = {
  error: function error(_error, stderr) {
    return "@veams/cli :: ERROR: Something goes wrong! Please open an issue on github with the following error code: ".concat(chalk.magenta(_error) || chalk.magenta(stderr));
  },
  warning: function warning(_warning) {
    return "@veams/cli :: WARNING: ".concat(_warning);
  },
  info: function info(_info) {
    return "@veams/cli :: INFORMATION: ".concat(_info);
  },
  help: function help(_help) {
    return "@veams/cli :: HELP: ".concat(_help);
  },
  success: function success(item) {
    return "@veams/cli :: DONE: ".concat(item, " successfully added!");
  }
};
/* ==============================================
 * Path Helpers
 * ============================================== */

helpers.cleanupPath = function (p) {
  if (p !== '') {
    return p.replace(/\/?$/, '/');
  }
};

helpers.getPath = function (file) {
  if (file !== '') {
    return path.dirname(file);
  }
};
/* ==============================================
 * String Helpers
 * ============================================== */


helpers.toCamelCase = function (str) {
  // Lower cases the string
  return str.toLowerCase() // Replaces any - or _ characters with a space
  .replace(/[-_]+/g, ' ') // Removes any non alphanumeric characters
  .replace(/[^\w\s]/g, '') // Uppercases the first character in each group immediately following a space
  // (delimited by spaces)
  .replace(/ (.)/g, function ($1) {
    return $1.toUpperCase();
  }) // Removes spaces
  .replace(/ /g, '');
};

helpers.hyphenate = function (str) {
  return str.replace(/\s/g, "-").toLowerCase();
};

helpers.capitalizeFirstLetter = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Log messages to the console.
 *
 * @param {String} color - Define the color of message (see chalk.js).
 * @param {String} msg - Message which will be displayed.
 */


helpers.message = function (color, msg) {
  console.log(chalk[color](marker) + chalk[color](msg) + chalk[color](marker));
};
/**
 * Get last folder
 *
 * @param {String} p - Path.
 */


helpers.getLastFolder = function (p) {
  return p.split(path.sep).pop();
};

helpers.extend = function (a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }

  return a;
};

helpers.deepExtend = function (destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }

  return destination;
};
/**
 * Copy file to specific destination.
 *
 * @param {Object} obj - object contains all paths
 * @param {Object} obj.src - root path of files
 * @param {String} obj.dest - destination path of files
 */


helpers.copy = function (obj) {
  var src = obj.src;
  var dest = obj.dest;
  return new _promise["default"](function (resolve, reject) {
    fsx.copy(src, dest, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(src, dest);
      }
    });
  });
};

helpers.readDir = function (dir) {
  return new _promise["default"](function (resolve, reject) {
    fsx.readdir(dir, function (err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

helpers.writeFile = function (filepath, data) {
  return new _promise["default"](function (resolve, reject) {
    fsx.writeFile(filepath, data, 'utf8', function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(filepath, data);
      }
    });
  });
};

helpers.readFile = function (filepath) {
  return new _promise["default"](function (resolve, reject) {
    fsx.readFile(filepath, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

helpers.readJSON = function (filepath) {
  return new _promise["default"](function (resolve, reject) {
    fsx.readFile(filepath, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

helpers.write = function (filepath, data) {
  return new _promise["default"](function (resolve, reject) {
    mkdirp(path.dirname(filepath), function (err) {
      if (err) reject(err);else resolve(helpers.writeFile(filepath, data));
    });
  });
};

helpers.fileExists = function (filepath) {
  return new _promise["default"](function (resolve, reject) {
    fsx.stat(filepath, function fsStat(err, fileOrFolder) {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false);
        } else {
          reject(err);
        }
      } else {
        resolve(fileOrFolder.isFile());
      }
    });
  });
};

helpers.folderExists = function (filepath) {
  return new _promise["default"](function (resolve, reject) {
    fsx.stat(filepath, function fsStat(err, fileOrFolder) {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false);
        } else {
          reject(err);
        }
      } else {
        resolve(fileOrFolder.isDirectory());
      }
    });
  });
};

helpers.remove = function (path) {
  return new _promise["default"](function (resolve, reject) {
    fsx.remove(path, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(path);
      }
    });
  });
};

helpers.resolveImportPath = function (firstPath, secondPath) {
  var fPath = path.dirname(firstPath);
  var sPath = path.dirname(secondPath);
  return path.relative(fPath, sPath).replace(/\\/gi, '/');
};
/* ==============================================
 * Export
 * ============================================== */


module.exports = helpers;