"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var gonzales = require('gonzales-pe');

module.exports = function (content, resolvedPath) {
  var importStr = "\n@import \"".concat(resolvedPath, "\";");
  return parseContents([content, importStr]).then(function (parsedTrees) {
    return addImport(parsedTrees[0], parsedTrees[1]);
  });
};

function parseContents() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var parsedContent = [];

  for (var i = 0; i < content.length; i++) {
    parsedContent.push(parse(content[i]));
  }

  return _promise["default"].all(parsedContent);
}
/**
 * parse content
 */


function parse(content) {
  return new _promise["default"](function (resolve, reject) {
    resolve(gonzales.parse(content, {
      syntax: 'scss'
    }));
  });
}

function addImport(parsedFile, parsedPath) {
  var idx;
  var alreadyDefined = false;
  parsedFile.traverse(function (node, index) {
    if (node.is('atrule')) {
      idx = index;
      alreadyDefined = false;
    }

    if (idx && idx < index && !alreadyDefined) {
      if (node.content.includes('\n')) {
        idx = index - 1;
        alreadyDefined = true;
      }
    }

    if (parsedFile.length - 1 === index && !alreadyDefined) {
      if (node.type === 'declarationDelimiter' || node.type === 'singlelineComment') {
        idx = index;
        alreadyDefined = true;
      }
    }
  });

  if (idx) {
    parsedFile.insert(idx + 1, parsedPath);
  } else {
    parsedFile.content.push(parsedPath);
  }

  return new _promise["default"](function (resolve, reject) {
    resolve(parsedFile.toString());
  });
}