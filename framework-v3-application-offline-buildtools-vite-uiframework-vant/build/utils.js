const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const { formatDate, generateGUID } = require('@winner-fed/cloud-utils');
const { name, version, buildVersion, description = '发布物描述测试' } = require('../package.json');
const runtimeArgs = process.argv.slice(2);
// 构建 docker 容器化发布物
// windows 不区分大小写
// mac 与 liunx 只认小写
// npm run build:see -dockerSeePack=true
const isDocker = process.env.npm_config_dockerseepack === 'true' || process.env.npm_config_dockerSeePack === 'true';

// 判断是否是 git
exports.isGitSync = function isGitSync(dir) {
  return fs.existsSync(path.join(dir, '.git'));
};

exports.getGitHash = function getGitHash() {
  let rev;
  try {
    rev = fs
      .readFileSync('.git/HEAD')
      .toString()
      .trim()
      .split(/.*[: ]/)
      .slice(-1)[0];
  } catch (error) {
    rev = generateGUID().slice(0, 8);
  }

  if (rev.indexOf('/') === -1) {
    return rev;
  } else {
    try {
      return fs
        .readFileSync('.git/' + rev)
        .toString()
        .trim();
    } catch (error) {
      console.log(chalk.red('.git/refs/heads/master 访问失败，还没有进行过第一次提交。默认取值为 guid。'));
      return generateGUID().slice(0, 8);
    }
  }
};

exports.transformTime = function transformTime() {
  if (exports.isGitSync(process.cwd())) {
    return `${formatDate(Date.now(), 'yyyyMMddHHmmss')}.${exports.getGitHash().substring(0, 8)}`;
  } else {
    return `${formatDate(Date.now(), 'yyyyMMddHHmmss')}.${generateGUID().slice(0, 8)}`;
  }
};

/**
 * 生成发布物的相关信息
 * @param system
 * @param type
 * @param outputName
 * @returns {{seePackageName: string, seePackageOptions: {system, templateFunc: ((function(): (string|string))|*), variablesFunc: ((function(): (*|[]|undefined))|*), name, description: string, type, version}}}
 */
exports.generateSeePackageInfo = function generateSeePackageInfo({ system, type, outputName }) {
  let seePackageName = `${system}-${name}-web`;
  const templateFunc = () => {
    if (type === 'bizframe') {
      return `./${outputName}/config.local.js`;
    }

    // 子包遵循主框架的规范
    return `./${outputName}/${name}/sysconfig.js`;
  };

  const variablesFunc = () => {
    try {
      const { variables } = require(`./package/variables.js`);

      return variables || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const seePackageOptions = {
    system,
    type,
    name,
    version,
    templateFunc,
    variablesFunc,
    description
  };

  if (isDocker) {
    seePackageName += '-docker';
    seePackageOptions.seePackageType = 'docker';
  }

  // 生成 see 发布物名称和版本
  function generateSeePackageNameAndVersion() {
    let appVersion = version.replace('-patch', '.') || `1.0.0`;
    const appVersionArray = appVersion.split('.');
    appVersion = appVersionArray.length === 3 ? appVersion + '.0' : appVersion;
    const cloneBuildVersion = buildVersion || appVersion;

    seePackageName += `-${cloneBuildVersion}`;

    // npm run build:see 测试包
    // npm run build:see prod 生产包
    // 兼容财富中台外框架命令
    // npm run build:see yes 生产包
    if (runtimeArgs[0] !== 'prod' && runtimeArgs[0] !== 'yes') {
      appVersion = `${appVersion}-${exports.transformTime()}`;
      seePackageName += `-${exports.transformTime()}`;
    }

    return {
      appVersion
    };
  }

  const { appVersion } = generateSeePackageNameAndVersion();

  seePackageOptions.version = appVersion || version;

  return {
    seePackageOptions,
    seePackageName
  };
};

/**
 * 构建 docker 包时，拷贝 dist 目录里的内容到 docker/html 目录
 * 1. 先移除 docker/html 文件夹
 * 2. 拷贝 dist 目录里的内容到 docker/html 目录下
 * cp -r dist docker/html 命令的 js 版本
 */
exports.copyDistToDocker = function copyDistToDocker() {
  const dockerHtmlPath = path.resolve(__dirname, '../docker/html');

  fs.remove(dockerHtmlPath, (err) => {
    if (err) return console.error(err);
    fs.copy(path.resolve(__dirname, '../dist'), dockerHtmlPath, (err) => {
      if (err) {
        console.error(err);
        console.error('拷贝 dist 至 docker/html 失败！！！');
      }
    });
  });
};
