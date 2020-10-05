#!/usr/bin/env node

var inquirer = require("inquirer");
var chalk = require("chalk");

const title = chalk.bold.red;
const response = chalk.blue;

var resume = require("./helpers/resume.json");
var dividerConstructor = require("./helpers/divider.js");
var divider = new dividerConstructor(70, "green");

var resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know about me?",
  choices: [...Object.keys(resume), "Exit"]
};

function resumeHandler() {
  console.log("Hello,My name is SilentLad and welcome to my resume.");
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions == "Exit") {
      console.clear();
      return;
    }
    var option = answer.resumeOptions;

    divider.printTop();

    resume[`${option}`].forEach((info, ind) => {
      if (typeof info === "string") {
        console.log(divider.containString(`  ${info}`, response));
      } else {
        Object.values(info).forEach((value, ind) => {
          if (ind > 1) {
            console.log(divider.containString(`    ${value}`, response));
          } else if (ind == 1) {
            console.log(divider.containString(`    ${value}`, chalk.cyan.bold));
          } else {
            console.log(divider.containString(`  ${value.padEnd(38)}`, title));
          }
        });
        ind !== resume[`${option}`].length - 1 && divider.printLine();
      }
    });
    divider.printBottom();

    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack == "Back") {
          process.stdout.write("\033c");
          resumeHandler();
        } else {
          return;
        }
      });
  });
}

(() => {
  console.clear();
  resumeHandler();
})();
