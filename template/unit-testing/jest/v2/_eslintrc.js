// http://eslint.org/docs/user-guide/configuring
// http://eslint.cn/docs/user-guide/configuring 中文，注意版本是否和官网一致
module.exports = {
  extends: ['@winner-fed/win', '@winner-fed/win/vue', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
