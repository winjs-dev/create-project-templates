// http://eslint.org/docs/user-guide/configuring
// http://eslint.cn/docs/user-guide/configuring 中文，注意版本是否和官网一致
module.exports = {
  extends: ['@winner-fed/win', '@winner-fed/win/typescript', '@winner-fed/win/vue', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
        // does not work with type definitions
        'no-unused-vars': 'off'
      }
    }
  ]
};
