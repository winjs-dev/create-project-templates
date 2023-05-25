// https://stylelint.io/
// https://stylelint.docschina.org/user-guide/rules/ 中文，注意版本是否和官网一致
module.exports = {
  extends: '@winner-fed/stylelint-config-win',
  // 指定 less 语法
  customSyntax: 'postcss-less',
  // html, vue
  overrides: [
    {
      files: ['*.html', '**/*.html', '*.htm', '**/*.htm', '*.vue', '**/*.vue'],
      customSyntax: 'postcss-html'
    }
  ]
};
