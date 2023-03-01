/**
 * deploy.config.js 配置文件
 * 构建 SEE 平台包和自动化部署前端包
 * 具体配置可以参考：https://www.npmjs.com/package/@winner-fed/deploy-cli
 *
 * @Author: liwb (lwbhtml@163.com)
 * @Date: 2023-01-09 13:50
 * @LastEditTime: 2023-01-09 13:50
 * @Description: deploy.config
 */
const runtimeArgs = process.argv.slice(2);
// 构建 docker 容器化发布物
// 注意：windows 不区分大小写
// 执行命令：npm run build:see -dockerSeePack
const isDocker = process.env.npm_config_dockerseepack === 'true';

// 是否构建生产包
// 测试包及生产包的主要区别在于包名。
// 包名格式：[平台]-[产品]-[项目][行业]-[web/h5]-[容器]-[构建版本号/版本号]-[时间戳].[hash].zip
// 举个例子如下：
// 测试包：主要是提供给测试人员用的，包名是构建带时间串和gitcommitid的。如 hscs-company-web-docker-V202101-00-000-20211201092557.ea48d3ef.zip
// 生产包：主要是用于生产环境部署的，包名不带时间串和gitcommitid的。如 hscs-company-web-docker-V202101-00-000.zip
// 执行命令：npm run build:see prod 或 npm run build:see yes
const isProduction = runtimeArgs[1] === 'prod' || runtimeArgs[1] === 'yes';

module.exports = {
  seeConfig: {
    system: 'winner-front',
    variables: [
      {
        type: 'input',
        label: '服务基础路径',
        name: 'API_HOME',
        required: true,
        tooltip: '后端服务接口地址',
        default: 'http://121.12.154.243:9080/h5-api-f/'
      },
      {
        type: 'switch',
        label: '是否启用调试工具',
        name: 'IS_OPEN_VCONSOLE',
        options: 'true:是;false:否',
        required: false,
        tooltip: '是否启用调试工具 vconsole',
        default: 'true'
      }
    ],
    isProduction,
    isDocker
  }
};
