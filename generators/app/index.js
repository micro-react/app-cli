'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const download = require('download-git-repo');
const ora = require('ora');

module.exports = class extends Generator {

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ultimate ${chalk.red('generator-mr-cli')} generator!`)
    );
  }

  async writing() {
    const spinner = ora('Download template from github, it may be need a little time, please wait.').start();
    return new Promise((resolve, reject) => {
      download('github:micro-react/app-template', this.destinationRoot(), {}, function (err) {
        if (err) {
          spinner.fail()
          reject(err);
        } else {
          spinner.succeed()
          resolve();
        }
      });
    });
  }

  install() {
    this.yarnInstall();
  }
  
};
