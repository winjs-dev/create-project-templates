const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const webpack = require('webpack');
const path = require('path');
const fse = require('fs-extra');
const utils = require('./utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// https://github.com/antfu/unplugin-vue2-script-setup
const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default;

const resolve = utils.resolve;
const childName = utils.getChildName();
let entries = {};
let aliasMap = {
  vue$: 'vue/dist/vue.esm.js',
  '@': resolve('src'),
  '@assets': resolve('src/assets'),
  '@style': resolve('src/assets/style'),
  '@js': resolve('src/assets/js'),
  '@components': resolve('src/components'),
  '@mixins': resolve('src/mixins'),
  '@filters': resolve('src/filters'),
  '@store': resolve('src/store'),
  '@views': resolve('src/views'),

  // 文件别名
  services: resolve('src/services'),
  variable: resolve('src/assets/style/variable.less'),
  utils: resolve('node_modules/@winner-fed/cloud-utils/dist/cloud-utils.esm'),
  mixins: resolve('node_modules/@winner-fed/magicless/magicless.less')
};

// 复制文件
let copyPlugin = [];

entries[childName + '/' + childName] = './src/index.pro.js';

let staticExits = fse.pathExistsSync(resolve('src/static'));

if (staticExits) {
  copyPlugin.push({
    from: resolve('src/static'),
    to: resolve('dist/' + childName + '/static'),
    globOptions: {
      ignore: ['.*']
    }
  });
}

let sysConfigExits = fse.pathExistsSync(resolve('public/config.local.js'));

if (sysConfigExits) {
  copyPlugin.push({
    from: resolve('public/config.local.js'),
    to: resolve('dist/' + childName + '/sysconfig.js')
  });
}

utils.generateVersion();

let sysVersionExits = fse.pathExistsSync(resolve(`node_modules/${childName}/.tmp/version.js`));

if (sysVersionExits) {
  copyPlugin.push({
    from: resolve(`node_modules/${childName}/.tmp/version.js`),
    to: resolve('dist/' + childName + '/version.js')
  });
}

const webpackConfig = {
  mode: 'production',
  entry: entries,
  devtool: false,
  output: {
    path: resolve(`dist/${childName}`),
    publicPath: process.env.NODE_ENV === 'production' ? childName + '/' : '/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: utils.spJsPath(`[name].[chunkhash:8].js`),
    library: {
      type: 'umd',
      name: `_${childName}`
    }
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: aliasMap,
    modules: [resolve('node_modules')]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      // 在分割之前，这个代码块最小应该被引用的次数（译注：为保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）. must be greater than or equal 2. The minimum number of chunks which need to contain a module before it's moved into the commons chunk
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '_',
      name(module, chunks, cacheGroupKey) {
        const allChunksNames = chunks.map((chunk) => chunk.name).join('_');
        const prefix = cacheGroupKey === 'defaultVendors' ? 'vendors' : cacheGroupKey;
        return `${prefix}_${allChunksNames}`;
      },
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          chunks: 'async',
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            cacheDirectory: resolve('node_modules/.cache/vue-loader'),
            cacheIdentifier: 'vue'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        exclude: [resolve('src/icons')],
        generator: {
          filename: utils.assetsPath('img/[name].[hash][ext]') // 局部指定输出位置
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 限制于 10kb
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: utils.assetsPath('fonts/[name].[hash][ext]') // 局部指定输出位置
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 限制于 10kb
          }
        }
      },
      // src/icons
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      ...utils.generateStyleModules({
        sourceMap: false,
        extract: false,
        localIdentName: '[local]_[hash:base64:8]'
      })
    ]
  },
  externals: {
    vue: {
      global: 'Vue', // 外部 library 能够作为全局变量使用。用户可以通过在 script 标签中引入来实现。
      root: 'Vue', // 如果库运行在Node.js环境中
      commonjs: 'vue', // 如果运行在Node.js环境中
      commonjs2: 'vue', // 如果运行在Node.js环境中
      amd: 'vue' // 如果使用require.js等加载
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.BannerPlugin({
      banner:
        'version:' +
        (utils.getSubSystemVersion(childName) || process.env.npm_package_version) +
        ', creation time:' +
        utils.getDateTimeString() // 其值为字符串，将作为注释存在
    }),
    ScriptSetup({}),
    new CopyWebpackPlugin({ patterns: copyPlugin }),
    new WebpackManifestPlugin({
      fileName: resolve(`dist/${childName}/manifest.${Date.now()}.json`),
      generate(seed, files, entrypoints) {
        return files.reduce((manifest, { name, path: manifestFilePath }) => {
          const { root, dir, base } = path.parse(manifestFilePath);

          return {
            ...manifest,
            [name + '-' + base]: { path: manifestFilePath, root, dir }
          };
        }, seed);
      }
    })
  ]
};

module.exports = webpackConfig;
