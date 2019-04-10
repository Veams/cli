"use strict";

/**
 * Execute individual tasks
 */
var path = require('path');

var exec = require('child-process-promise').exec;

var cwd = path.resolve(__dirname, "../../");

module.exports = function (args) {
  var task = args[0];
  var option = args[1];

  switch (task) {
    case "grunticon":
      // exec(`npm run `);
      break;

    default:
      break;
  }
};