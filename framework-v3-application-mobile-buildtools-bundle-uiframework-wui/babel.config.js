const plugins = [];
plugins.push(
  [
    'import',
    {
      libraryName: '@winner-fed/win-ui',
      libraryDirectory: 'es',
      style: true
    },
    '@winner-fed/win-ui'
  ]
);
module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins,
  // 添加忽略 babel 编译的文件
  exclude: []
};
