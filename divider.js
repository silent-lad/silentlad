var box = require("./box.json");
var chalk = require("chalk");

var dividerObject = function(num, defaultColor) {
  this.length = num;
  this.color = defaultColor;
  var {
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
    vertical,
    horizontal
  } = box;

  this.printTop = function() {
    console.log(
      chalk[`${this.color}`](
        topLeft + horizontal.repeat(this.length) + topRight
      )
    );
  };
  this.printBottom = function() {
    console.log(
      chalk[`${this.color}`](
        bottomLeft + horizontal.repeat(this.length) + bottomRight
      )
    );
  };
  this.printLine = function() {
    console.log(
      vertical +
        chalk[`${this.color}`](horizontal.repeat(this.length)) +
        vertical
    );
  };
  this.printVertical = function() {
    console.log(chalk[`${this.color}`](vertical.repeat(this.length)));
  };
  this.containString = function(string, color) {
    return (
      chalk[`${this.color}`](vertical) +
      color(string.padEnd(this.length)) +
      chalk[`${this.color}`](vertical)
    );
  };
};

module.exports = dividerObject;
