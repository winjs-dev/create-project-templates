'use strict';

const path = require('path');
const { sh } = require('tasksfile');
const chalk = require('chalk');
const rawArgv = process.argv.slice(2);
const args = rawArgv.join(' ');
const replace = require('replace-in-file');
const { name } = require('../package.json');

const resolve = (dir) => {
  return path.join(__dirname, '../', dir);
};

const camelize = (str) => {
  return (str + '').replace(/-\D/g, function (match) {
    return match.charAt(1).toUpperCase();
  });
};

// 便于捕捉 build 之后的错误，然后进行自定义处理
// 配合 jenkins 执行 job
function command() {
  sh(`vue-cli-service build ${args}`, {
    async: true,
    stdio: 'inherit'
  })
    .then((output) => {
      const options = {
        files: [
          path.resolve(path.resolve(__dirname, '../dist'), '**/*.js'),
          path.resolve(path.resolve(__dirname, '../dist'), '**/*.html')
        ],
        from: [/LOCAL_CONFIG/g, /\$services/g, /LOCAL_HWS_CONFIG/g],
        to: [
          'LOCAL_CONFIG' + '_' + camelize(name),
          '$services' + '_' + camelize(name),
          'LOCAL_CONFIG'
        ]
      };

      replace.sync(options);
      console.log(chalk.cyan(output || ''));
    })
    .catch((err) => {
      console.error('\n');
      console.error(chalk.magenta('编译打包出错了 ~~~~(>_<)~~~~ \n'));
      console.error(chalk.magenta('具体错误信息如下 \n'));
      console.error(chalk.red(`${err}.\n`));
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    });
}

command();
