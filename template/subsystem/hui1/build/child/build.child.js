process.env.NODE_ENV = 'production';

const path = require('path');
const rm = require('rimraf');
const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');
const { camelize, removeVersion, getChildName } = require('./utils');
const builds = require('./config.child').getAllBuilds();
const replace = require('replace-in-file');

const childName = getChildName();

const spinner = ora('building for production...');
const build = function (builds) {
  return Promise.all(
    builds.map(
      (config) =>
        new Promise((resolve, reject) => {
          spinner.start();
          webpack(config, function (err, stats) {
            spinner.stop();
            if (err) reject(err);
            // console.log('stats', stats)
            process.stdout.write(
              stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
              }) + '\n'
            );

            resolve();
          });
        })
    )
  );
};

rm(path.resolve(__dirname, '../../dist'), (err) => {
  if (err) throw err;

  build(builds)
    .then(async () => {
      // 1, rename 全局变量 LOCAL_CONFIG TODO 风险 如果依赖主框架的全局变量
      // 2, rename $services,解决运行多个子包时，挂载到 Vue 实例原型命名的冲突
      const options = {
        files: [path.resolve(path.resolve(__dirname, '../../dist'), childName + '/**/*.js')],
        from: [/LOCAL_CONFIG/g, /\$services/g],
        to: ['LOCAL_CONFIG' + '_' + camelize(childName), '$services' + '_' + camelize(childName)]
      };

      replace.sync(options);

      // 移除 version 文件
      removeVersion();
      console.log(chalk.cyan('  Build complete.\n'));
    })
    .catch((err) => {
      console.log(chalk.red('Build failed with errors.\n'));
      console.log(err);
    });
});
