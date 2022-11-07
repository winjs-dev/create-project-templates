#!/usr/bin/env node
// @ts-check

import * as fs from 'node:fs';
import * as path from 'node:path';

import minimist from 'minimist';
import prompts from 'prompts';
import { red, yellow, cyan, magenta, green, bold } from 'kolorist';

import toValidPackageName from './utils/toValidPackageName';
import createSpawnCmd from './utils/createSpawnCmd';

import { microFrontTypeEnum } from './utils/dictionary';

import renderTemplate from './utils/renderTemplate';
import { postOrderDirectoryTraverse, preOrderDirectoryTraverse } from './utils/directoryTraverse';
import { generateMain, generateMainV3 } from './utils/generateMain';
import generateVueConfig from './utils/generateVueConfig';
import getCommand from './utils/getCommand';
import generateOfflinePackage from './utils/generateOfflinePackage';
import generateRouterInterceptor from './utils/generateRouterInterceptor';
import generateIndexHTML from './utils/generateIndexHTML';
import banner from './utils/banner';
import generateBabelConfig from './utils/generateBabelConfig';
import generateViteStyleImport from './utils/generateViteStyleImport.js';
import generateSeeScriptsConfig from './utils/generateSeeScripts';
import generateRegisterGlobalComponent from './utils/generateRegisterGlobalComponent';
import generateVitePlugin from './utils/generateVitePlugin';
import { generateOnlyContainer } from './utils/commonTools';
import { generateAppVue, generateAppVueV3 } from './utils/generateAppVue';

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

function canSafelyOverwrite(dir) {
  if (!fs.existsSync(dir)) {
    return true;
  }

  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    return true;
  }
  if (files.length === 1 && files[0] === '.git') {
    return true;
  }

  return false;
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  postOrderDirectoryTraverse(
    dir,
    (dir) => fs.rmdirSync(dir),
    (file) => fs.unlinkSync(file)
  );
}

function splitBySymbol(str) {
  if (str && str.includes('=')) {
    return str.split('=')[1];
  }
}

// 步骤
// 1. 选择使用框架 framework
// 2. 选择应用类型 application
// 3. 是否支持使用 Typescript
// 4. 选择打包构建工具 build-tools
// 5. 选择 UI 组件库 ui-framework
// 6. 选择布局适配方案 layout-adapter
// 7. 选择版本控制工具 version-control
// 8. 是否使用公司镜像源 mirror-source
// 9. 是否使用 see 命令输出包
// 10. 是否支持子应用或微应用
// 11. 是否支持单元测试
// --no-git 创建项目，但不初始化 Git
// --install 创建项目，自动安装依赖
async function init() {
  console.log(`\n${banner}\n`);

  const cwd = process.cwd();
  // possible options:
  // --typescript / --ts
  // --mirror-source / --ms
  // --see / --see
  // --force (for force overwriting)
  const argv = minimist(process.argv.slice(2), {
    alias: {
      typescript: ['ts'],
      'mirror-source': ['ms'],
      see: ['see']
    },
    // all arguments are treated as booleans
    boolean: true
  });

  // if any of the feature flags is set, we would skip the feature prompts
  // use `??` instead of `||` once we drop Node.js 12 support
  const isFeatureFlagsUsed =
    typeof (
      argv.default ??
      (argv.framework && ['v2', 'v3', 'mini'].includes(splitBySymbol(argv.framework))) ??
      (argv.application && ['mobile', 'pc', 'offline'].includes(splitBySymbol(argv.application))) ??
      (argv.mobileDevPlatform &&
        ['gmu', 'mpaas'].includes(splitBySymbol(argv.mobileDevPlatform))) ??
      (argv.mini && ['taro', 'uniapp', 'hola'].includes(splitBySymbol(argv.mini))) ??
      (argv.buildTools && ['bundle', 'bundless'].includes(splitBySymbol(argv.buildTools))) ??
      (argv.uiFramework &&
        ['wui', 'vant', 'hui', 'element-ui', 'ant'].includes(splitBySymbol(argv.uiFramework))) ??
      (argv.layoutAdapter && ['rem', 'vm'].includes(splitBySymbol(argv.layoutAdapter))) ??
      (argv.versionControl && ['svn', 'git'].includes(splitBySymbol(argv.versionControl))) ??
      argv.ts ??
      argv.see ??
      argv.ms ??
      argv.vitest ??
      argv.jest
    ) === 'boolean';

  let targetDir = argv._[0];
  const defaultProjectName = !targetDir ? 'winner-project' : toValidPackageName(targetDir);

  const forceOverwrite = argv.force;

  // git
  const shouldInitGit = argv.git !== false;
  // auto install
  const shouldInstall = argv.install === true;

  let result: {
    projectName?: string;
    shouldOverwrite?: boolean;
    packageName?: string;
    framework?: 'vue2' | 'vue3' | 'miniprogram';
    miniFramework?: 'taro' | 'uniapp' | 'hola';
    needsTypeScript?: boolean;
    application?: 'mobile' | 'pc' | 'offline';
    mobileDevPlatform?: 'gmu' | 'mpaas';
    offlineId?: string;
    offlineName?: string;
    mpaasOfflineId?: string;
    mpaasOfflineName?: string;
    buildTools?: 'bundle' | 'bundless';
    uiFramework?: 'wui' | 'vant' | 'hui' | 'element-ui' | 'ant';
    layoutAdapter?: 'rem' | 'vm';
    versionControl?: 'svn' | 'git';
    needsMirrorSource?: boolean;
    needsSeePackage?: boolean;
    microFrontType?: 'hui1' | 'qiankun';
    needsVitest?: boolean;
    needsJest?: boolean;
  } = {};

  const pcUI = [
    {
      title: cyan('Element UI'),
      value: 'element-ui'
    },
    {
      title: magenta('ant-design-vue'),
      value: 'ant'
    }
  ];

  // 没有用vue3实现
  const pcUI2 = [
    {
      title: yellow('h_ui'),
      value: 'hui'
    },
    ...pcUI
  ];

  try {
    // Prompts:
    // - Project name:
    //   - whether to overwrite the existing directory or not?
    //   - enter a valid package name for package.json
    // - Framework: default(vue2) / vue3 / miniprogram
    // - Application: default(mobile) / pc / offline
    // - Add Typescript Support? no
    // - BuildTools: default(bundle(webpack)) / bundless(vite)
    // - UI Framework: default(wui) / vant / hui / element-ui / ant-design-vue ...
    // - Layout Adapter: default(rem) / vw
    // - Version Control: default(git) / svn
    // - Add Company Mirror Source Support? no
    // - Add See package Support?  no
    // - Add Subsystem Support? no
    // - Add Vitest for Unit Testing? no
    // - Add Jest for Unit Testing? no
    result = await prompts(
      [
        {
          name: 'projectName',
          type: targetDir ? null : 'text',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: (state) => (targetDir = String(state.value).trim() || defaultProjectName)
        },
        {
          name: 'shouldOverwrite',
          type: () => (canSafelyOverwrite(targetDir) || forceOverwrite ? null : 'confirm'),
          message: () => {
            const dirForPrompt =
              targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`;

            return `${dirForPrompt} is not empty. Remove existing files and continue?`;
          }
        },
        {
          name: 'overwriteChecker',
          type: (prev, values) => {
            if (values.shouldOverwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled');
            }
            return null;
          }
        },
        {
          name: 'packageName',
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          name: 'framework',
          type: () => (isFeatureFlagsUsed ? null : 'select'),
          message: 'Select a framework?',
          choices: [
            {
              title: yellow('Vue 2'),
              value: 'v2'
            },
            {
              title: cyan('Vue 3'),
              value: 'v3'
            },
            {
              title: magenta('miniprogram'),
              value: 'mini'
            }
          ],
          initial: 0
        },
        {
          name: 'miniFramework',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework === 'mini' ? 'select' : null;
          },
          message: 'Select a small program development framework?',
          choices: [
            {
              title: yellow('Taro'),
              value: 'taro'
            },
            {
              title: cyan('uni-app'),
              value: 'uniapp'
            },
            {
              title: magenta('Hola'),
              value: 'hola'
            }
          ],
          initial: 0
        },
        {
          name: 'application',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' ? 'select' : null;
          },
          message: 'Choose whether your app is a PC or a mobile?',
          choices: [
            {
              title: yellow('mobile'),
              value: 'mobile'
            },
            {
              title: cyan('H5离线包'),
              value: 'offline'
            },
            {
              title: magenta('PC'),
              value: 'pc'
            }
          ],
          initial: 0
        },
        {
          name: 'mobileDevPlatform',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' && values.application === 'offline'
              ? 'select'
              : null;
          },
          message: 'Select a mobile development platform?',
          choices: [
            {
              title: cyan('GMU'),
              value: 'gmu'
            },
            {
              title: magenta('mPaaS'),
              value: 'mpaas'
            }
          ],
          initial: 0
        },
        {
          name: 'offlineId',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' && values.mobileDevPlatform === 'gmu'
              ? 'text'
              : null;
          },
          message: 'Fill in the offline package ID',
          validate: (val) => {
            return /^[0-9a-z]{4,8}$/.test(val)
              ? true
              : '请输入4-8位的小写英文字母或数字，注意唯一性';
          },
          initial: '离线包 ID'
        },
        {
          name: 'offlineName',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' && values.mobileDevPlatform === 'gmu'
              ? 'text'
              : null;
          },
          message: 'Fill in the offline package name',
          validate: (val) => {
            return /^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$/.test(val)
              ? true
              : '请输入1-10位的中英文字符或数字';
          }
        },
        {
          name: 'mpaasOfflineId',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' && values.mobileDevPlatform === 'mpaas'
              ? 'text'
              : null;
          },
          message: 'Fill in the offline package ID',
          validate: (val) => {
            return /^(\d{8})/.test(val) ? true : '请输入8位的数字，注意唯一性';
          },
          initial: '离线包 ID'
        },
        {
          name: 'mpaasOfflineName',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' && values.mobileDevPlatform === 'mpaas'
              ? 'text'
              : null;
          },
          message: 'Fill in the offline package name'
        },
        {
          name: 'needsTypeScript',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' ? 'toggle' : null;
          },
          message: 'Add TypeScript?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'buildTools',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            // 离线包不能使用 vite 作为构建工具，type=module 不支持文件协议访问
            return values.framework !== 'mini' && values.application !== 'offline'
              ? 'select'
              : null;
          },
          message: 'Choose whether your build tools is bundle(webpack) or bundless(vite)?',
          choices: [
            {
              title: yellow('bundle(webpack)'),
              value: 'bundle'
            },
            {
              title: cyan('bundless(vite)'),
              value: 'bundless'
            }
          ],
          initial: 0
        },
        {
          name: 'uiFramework',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' ? 'select' : null;
          },
          message: 'Select a UI Framework',
          choices: (prev, values) => {
            if (values.framework === 'mini') {
              return;
            }
            if (values.application === 'pc') {
              return values.framework === 'v2' ? pcUI2 : pcUI;
            }
            // mobile or offline
            if (values.framework === 'v3') {
              return [
                {
                  title: yellow('WinUI'),
                  value: 'wui'
                },
                {
                  title: green('Vant'),
                  value: 'vant'
                }
              ];
            }
            // default v2
            return [
              {
                title: yellow('WinUI'),
                value: 'wui'
              },
              {
                title: green('Vant'),
                value: 'vant'
              }
            ];
          },
          initial: 0
        },
        {
          name: 'layoutAdapter',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' && values.application !== 'pc' ? 'select' : null;
          },
          message: 'Select a mobile layout adaptation plan?',
          choices: [
            {
              title: yellow('rem'),
              value: 'rem'
            },
            {
              title: green('viewpoint'),
              value: 'vw'
            }
          ],
          initial: 0
        },
        {
          name: 'versionControl',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' ? 'select' : null;
          },
          message: 'Select a Version control tool?',
          choices: [
            {
              title: yellow('Git'),
              value: 'git'
            },
            {
              title: green('SVN'),
              value: 'svn'
            }
          ],
          initial: 0
        },
        {
          name: 'needsMirrorSource',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' ? 'toggle' : null;
          },
          message: 'Add Company Mirror Source Support?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsSeePackage',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' ? 'toggle' : null;
          },
          message: 'Add See Package Support?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'microFrontType',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework !== 'mini' &&
              values.framework === 'v2' &&
              values.application === 'pc' &&
              values.buildTools === 'bundle'
              ? 'multiselect'
              : null;
          },
          message: 'Select a collection of subsystem types?',
          choices: [
            { title: 'hui pro 1.0', value: microFrontTypeEnum.hui1 },
            { title: 'qiankun', value: microFrontTypeEnum.qiankun }
          ],
          hint: '- Space to select, Return to submit'
        },
        {
          name: 'needsVitest',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework === 'mini' || values.buildTools === 'bundle' ? null : 'toggle';
          },
          message: 'Add Vitest for Unit Testing?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsJest',
          type: (prev, values) => {
            if (isFeatureFlagsUsed) return null;
            return values.framework === 'mini' || values.buildTools === 'bundless'
              ? null
              : 'toggle';
          },
          message: 'Add jest for Unit Testing?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        }
      }
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    process.exit(1);
  }
  // `initial` won't take effect if the prompt type is null
  // so we still have to assign the default values here
  const {
    projectName,
    packageName = projectName ?? defaultProjectName,
    shouldOverwrite,
    framework = argv.framework,
    miniFramework = argv.miniFramework,
    needsTypeScript = argv.typescript,
    application = argv.application,
    mobileDevPlatform = argv.mobileDevPlatform,
    offlineId = argv.offlineId || 'offline',
    offlineName = argv.offlineName || 'default-project',
    mpaasOfflineId = argv.mpaasOfflineId || '88888888',
    mpaasOfflineName = argv.mpaasOfflineName || 'default-project',
    buildTools = argv.buildTools || 'bundle',
    uiFramework = argv.uiFramework,
    layoutAdapter = argv.layoutAdapter,
    versionControl = argv.versionControl,
    needsMirrorSource = argv.ms,
    needsSeePackage = argv.see,
    microFrontType = argv.microFrontType || [],
    needsVitest = argv.vitest,
    needsJest = argv.jest
  } = result;

  // app 容器name
  const appContainerName = generateOnlyContainer(packageName);

  const root = path.join(cwd, targetDir);

  const cmdIgnore = createSpawnCmd(root, 'ignore');
  const cmdInherit = createSpawnCmd(root, 'inherit');

  if (shouldOverwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  console.log(`\nScaffolding project in ${root}...`);

  const pkg = { name: packageName, version: '0.0.0' };
  fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(pkg, null, 2));

  // work around the esbuild issue that `import.meta.url` cannot be correctly transpiled
  // when bundling for node and the format is cjs
  // const templateRoot = new URL('./template', import.meta.url).pathname
  const templateRoot = path.resolve(__dirname, 'template');
  const options = {
    projectName,
    packageName,
    framework,
    application,
    mobileDevPlatform,
    offlineId,
    offlineName,
    mpaasOfflineId,
    mpaasOfflineName,
    buildTools,
    uiFramework,
    layoutAdapter,
    versionControl,
    microFrontType,
    needsMirrorSource,
    needsSeePackage,
    needsVitest,
    needsJest
  };
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName);
    renderTemplate(templateDir, root, options);
  };

  // mini 小程序开发框架
  if (framework === 'mini') {
    if (miniFramework === 'uniapp') {
      render('framework/miniprogram/uniapp');
    } else if (miniFramework === 'hola') {
      render('framework/miniprogram/hola');
    }
    render('framework/miniprogram/taro');
  } else {
    // vue2 vue3
    // Render base template
    render('base');

    // Add framework.
    if (framework === 'v3') {
      render('framework/vue3');
    } else {
      render('framework/default');
    }

    // typescript support
    if (needsTypeScript) {
      if (framework === 'v3') {
        render('language/typescript/v3');
      } else {
        render('language/typescript/v2');
      }
    } else {
      if (framework === 'v3') {
        render('language/default/v3');
      } else {
        render('language/default/v2');
      }
    }

    // application
    if (application === 'pc') {
      render('application/pc');
    } else {
      render('application/default');

      if (application === 'offline') {
        if (mobileDevPlatform === 'gmu') {
          render('application/offline/gmu');
        } else {
          render('application/offline/mpaas');
        }
      }

      if (layoutAdapter === 'vw') {
        render('layout-adapter/viewpoint');
      } else {
        render('layout-adapter/default');
      }
    }

    // buildTools
    if (buildTools === 'bundle') {
      render('build-tools/bundle');

      // package.json
      // tsconfig.json
      if (needsTypeScript) {
        if (framework === 'v2') {
          render('config/bundle/typescript/v2');
        } else {
          render('config/bundle/typescript/v3');
        }

        if (uiFramework === 'vant' || uiFramework === 'wui') {
          render('config/bundle/typescript/vant');
        }
      }
    } else {
      render('build-tools/bundless');

      if (framework === 'v2') {
        render('config/bundless/default/v2');
      } else {
        render('config/bundless/default/v3');
      }

      // package.json
      if (needsTypeScript) {
        if (framework === 'v2') {
          render('config/bundless/typescript/v2');
        } else {
          render('config/bundless/typescript/v3');
        }
      }
    }

    // ui-framework
    if (uiFramework === 'vant') {
      if (buildTools === 'bundle' && !needsTypeScript) {
        render('config/bundle/default');
      }
      if (framework === 'v2') {
        render('ui-framework/vant/v2');
      } else {
        render('ui-framework/vant/v3');
      }
    } else if (uiFramework === 'hui') {
      render('ui-framework/hui');
    } else if (uiFramework === 'ant') {
      if (framework === 'v2') {
        render('ui-framework/ant-design-vue/v2');
      } else {
        render('ui-framework/ant-design-vue/v3');
      }
    } else if (uiFramework === 'element-ui') {
      if (framework === 'v2') {
        render('ui-framework/element-ui/v2');
      } else {
        render('ui-framework/element-ui/v3');
      }
    } else {
      // default
      if (buildTools === 'bundle' && !needsTypeScript) {
        render('config/bundle/default');
      }
      if (framework === 'v2') {
        render('ui-framework/default/v2');
      } else {
        render('ui-framework/default/v3');
      }
    }

    // version-control
    if (versionControl === 'svn') {
      render('version-control/svn');
    } else {
      render('version-control/default');
    }

    if (needsMirrorSource) {
      render('mirror-source');
    }

    if (needsSeePackage) {
      render('see-package');

      // build/package/see.js
      fs.writeFileSync(
        path.resolve(root, 'build/package/see.js'),
        generateSeeScriptsConfig({
          buildTools
        })
      );
    }

    if (Array.isArray(microFrontType) && microFrontType.length) {
      render('subsystem/base');

      if (microFrontType.includes(microFrontTypeEnum.hui1)) {
        render('subsystem/hui1');
      }

      if (microFrontType.includes(microFrontTypeEnum.qiankun)) {
        render('subsystem/qiankun');
      }
    }
    // unit-testing
    // vitest
    if (needsVitest) {
      if (framework === 'v3') {
        render('unit-testing/vitest/v3');
      } else {
        render('unit-testing/vitest/v2');
      }
    }

    // jest
    if (needsJest) {
      render('unit-testing/jest/common');
      if (framework === 'v3') {
        render('unit-testing/jest/v3');
      } else {
        render('unit-testing/jest/v2');
      }
    }

    // Main generation
    fs.writeFileSync(
      path.resolve(root, 'src/main.js'),
      framework === 'v3'
        ? generateMainV3({
            application,
            uiFramework,
            layoutAdapter,
            needsTypeScript,
            buildTools,
            mobileDevPlatform,
            appContainerName
          })
        : generateMain({
            packageName,
            application,
            uiFramework,
            layoutAdapter,
            needsTypeScript,
            buildTools,
            mobileDevPlatform,
            microFrontType,
            appContainerName
          })
    );

    //  index.html
    fs.writeFileSync(
      path.resolve(root, buildTools === 'bundle' ? 'public/index.html' : 'index.html'),
      generateIndexHTML({
        packageName,
        microFrontType,
        mobileDevPlatform,
        appContainerName,
        buildTools
      })
    );

    // App.vue
    fs.writeFileSync(
      path.resolve(root, 'src/App.vue'),
      framework === 'v3'
        ? generateAppVueV3({
            microFrontType,
            appContainerName,
            packageName,
            needsTypeScript,
            application
          })
        : generateAppVue({
            microFrontType,
            appContainerName,
            packageName,
            needsTypeScript,
            application
          })
    );

    // webpack
    if (buildTools === 'bundle') {
      // vue.config.js
      fs.writeFileSync(
        path.resolve(root, 'vue.config.js'),
        generateVueConfig({
          framework,
          application,
          uiFramework,
          needsTypeScript,
          versionControl,
          microFrontType
        })
      );

      // babel.config.js
      fs.writeFileSync(
        path.resolve(root, 'babel.config.js'),
        generateBabelConfig({ uiFramework, needsTypeScript })
      );
    } else {
      // vite

      // build/vite/plugin/styleImport.js
      fs.writeFileSync(
        path.resolve(root, 'build/vite/plugin/styleImport.js'),
        generateViteStyleImport({ uiFramework, framework })
      );

      // build/vite/plugin/index.js
      fs.writeFileSync(
        path.resolve(root, 'build/vite/plugin/index.js'),
        generateVitePlugin({ framework })
      );
    }

    // router.interceptor.js
    fs.writeFileSync(
      path.resolve(root, 'src/router/router.interceptor.js'),
      generateRouterInterceptor({
        application,
        mobileDevPlatform
      })
    );

    // 离线包
    if (application === 'offline') {
      fs.writeFileSync(
        path.resolve(root, 'offlinePackage.json'),
        generateOfflinePackage({
          mobileDevPlatform,
          offlineId,
          offlineName,
          mpaasOfflineId,
          mpaasOfflineName
        })
      );
    }

    // src/components/global/index.js
    fs.writeFileSync(
      path.resolve(root, 'src/components/global/index.js'),
      generateRegisterGlobalComponent({
        buildTools,
        framework
      })
    );

    // Cleanup.

    // Convert the JavaScript template to the TypeScript
    if (needsTypeScript) {
      // Check all the remaining `.js` files:
      //   - If the corresponding TypeScript version already exists, remove the `.js` version.
      //   - Otherwise, rename the `.js` file to `.ts`
      // Remove `jsconfig.json`, because we already have tsconfig.json
      // `jsconfig.json` is not reused, because we use solution-style `tsconfig`s, which are much more complicated.
      preOrderDirectoryTraverse(
        path.resolve(root, 'src'),
        () => {},
        (filepath) => {
          if (filepath.endsWith('.js')) {
            const tsFilePath = filepath.replace(/\.js$/, '.ts');
            if (fs.existsSync(tsFilePath)) {
              fs.unlinkSync(filepath);
            } else {
              fs.renameSync(filepath, tsFilePath);
            }
          } else if (path.basename(filepath) === 'jsconfig.json') {
            fs.unlinkSync(filepath);
          }
        }
      );

      // Rename entry in `index.html`
      let indexHtmlPath = '';
      if (buildTools === 'bundle') {
        indexHtmlPath = path.resolve(root, 'public/index.html');
      } else {
        indexHtmlPath = path.resolve(root, 'index.html');
      }
      const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
      fs.writeFileSync(indexHtmlPath, indexHtmlContent.replace('src/main.js', 'src/main.ts'));
    }
  }

  // 如果版本管理工具选择了 Git
  // 则进行 Git 初始化
  if (versionControl === 'git') {
    // cli 后跟参数 --no-git
    if (shouldInitGit) {
      console.log();
      try {
        await cmdIgnore('git', ['init']);
        await cmdIgnore('git', ['add .']);
        await cmdIgnore('git', ['commit -m "initialize commit"']);
        console.log(`  ${green('Successfully initialization Git repository!')}`);
      } catch (error) {
        console.log(`  ${red('Initialization Git repository failed!')}`);
      }
    }
  }
  // Instructions:
  // Supported package managers: pnpm > yarn > npm
  // Note: until <https://github.com/pnpm/pnpm/issues/3505> is resolved,
  // it is not possible to tell if the command is called by `pnpm init`.
  const userAgent = process.env.npm_config_user_agent ?? '';
  const packageManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm';

  if (shouldInstall) {
    console.log();
    console.log(`  ${yellow('Installing deps...')}`);
    await cmdInherit(packageManager, [packageManager === 'npm' ? 'install' : '']);
    console.log();
    console.log(`  ${green('Successfully install deps!')}`);
  }

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  ${bold(green(`cd ${path.relative(cwd, root)}`))}`);
  }
  !shouldInstall && console.log(`  ${bold(green(getCommand(packageManager, 'bootstrap')))}`);
  console.log(`  ${bold(green(getCommand(packageManager, 'dev')))}`);
  console.log();
}

init().catch((e) => {
  console.error(e);
});
