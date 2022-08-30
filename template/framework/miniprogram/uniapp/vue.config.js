module.exports = {
  transpileDependencies: ['@dcloudio/uni-ui'],
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commonComponents: {
            name: 'chunk-common-component',
            test: /src\/components/,
            chunks: 'all',
            minChunks: 10, // 只有引用超过10次的组件才打进此包
            maxSize: 500000, // 因为公共组件也很大, 所以限制打包大小为500K
            priority: 11 // 优先级11, 先进行此分包操作
          },
          components: {
            name: 'chunk-component',
            test: /src\/components/,
            chunks: 'all',
            minChunks: 4, // 只有引用超过4次才打进此包
            maxSize: 500000, // 由于公共组件很大, 允许最大打包大小为500K
            reuseExistingChunk: true, // 重复利用已存在的包
            priority: 10
          },
          common: {
            chunks: 'initial',
            minChunks: 2,
            priority: -20
          }
        }
      }
    }
  },
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 4147,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      // '/g/hspf-shelf-svr/v/': {
      //   /* 目标代理服务器地址 */
      //   target: 'http://121.40.59.72:8088',
      //   /* 允许跨域 */
      //   changeOrigin: true,
      // },
    }
  }
};
