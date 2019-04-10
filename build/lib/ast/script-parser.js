"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var babel = require('@babel/core');

var prettier = require('prettier'); // use custom plugin to transform the source


module.exports = function (file, options) {
  return new _promise["default"](function (resolve, reject) {
    var code = babel.transform(file, {
      plugins: [[importer, options]]
    }).code;
    resolve(code);
    reject('Error :: Parsing of script goes wrong.');
  });
};

function importer(_ref) {
  var t = _ref.types;
  var currentIdx = 0;
  var importLength = 0;
  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(path, state) {
        var body = path.parent.body;

        if (currentIdx < 1) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator2["default"])(body), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var item = _step.value;

              if (item.type === 'ImportDeclaration') {
                importLength += 1;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        currentIdx += 1;
        if (currentIdx !== importLength) return;
        var specifiers = path.node.specifiers;
        var src = path.node.source.value;
        var importDeclaration = makeImport(t, {
          name: state.opts.clName
        }, state.opts.path);
        var replacements = [];

        if (specifiers.length > 0) {
          var names = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator2["default"])(specifiers), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var specifier = _step2.value;
              names.push({
                name: specifier.local.name,
                type: specifier.type
              });
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          if (names.length > 1 || names[0].type === 'ImportSpecifier') {
            replacements.push(makeImports(t, names, src));
          } else {
            replacements.push(makeImport(t, names[0], src));
          }
        }

        replacements.push(importDeclaration);
        path.replaceWithMultiple(replacements);
      }
    }
  };
}

function makeImport(t, name, path) {
  return t.importDeclaration([t.importDefaultSpecifier(t.identifier(name.name))], t.stringLiteral(path));
}

function makeImports(t, names, path) {
  var identifiers = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator2["default"])(names), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var name = _step3.value;
      identifiers.push(t.importSpecifier(t.identifier(name.name), t.identifier(name.name)));
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return t.importDeclaration(identifiers, t.stringLiteral(path));
}