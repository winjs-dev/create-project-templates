const path = require('path');
const yargsParser = require('yargs-parser');

let designWidth = 750;

if (process.env.TARO_ENV === 'h5') {
  designWidth = 375;
}

const argv = yargsParser(process.argv.slice(2));

const config = {
  projectName: 'holaTemplate',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  presets: ['@holajs/preset-gmu'],
  plugins: ['@holajs/plugin-platform-gmump'],
  defineConstants: {
    IS_H5: process.env.TARO_ENV === 'h5',
    IS_RN: process.env.TARO_ENV === 'rn',
    IS_WEAPP: process.env.TARO_ENV === 'weapp'
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/package': path.resolve(__dirname, '..', 'package.json'),
    '@/project': path.resolve(__dirname, '..', 'project.config.json'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    variables: path.resolve(__dirname, '..', 'src/assets/style/variables.scss')
  },
  copy: {
    patterns: [{ from: 'sitemap.json', to: `dist/${process.env.TARO_ENV}/sitemap.json` }],
    options: {}
  },
  framework: 'vue',
  weapp: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    lessLoaderOption: {
      additionalData: `@import '@/assets/style/variables.less'; @import '@/assets/style/mixins.less';`
    }
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    lessLoaderOption: {
      additionalData: `@import '@/assets/style/variables.less'; @import '@/assets/style/mixins.less';`
    }
  },
  gmu: {
    devServer: {
      port: 3000
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    lessLoaderOption: {
      additionalData: `@import '@/assets/style/variables.less'; @import '@/assets/style/mixins.less';`
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[chunkhash].js'
    },
    imageUrlLoaderOption: {
      limit: 5000,
      name: 'static/images/[name].[hash].[ext]'
    },
    miniCssExtractPluginOption: {
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[chunkhash].css'
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    devServer: {
      host: '0.0.0.0',
      port: 4146
    },
    lessLoaderOption: {
      additionalData: `@import '@/assets/style/variables.less'; @import '@/assets/style/mixins.less';`
    }
  }
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
