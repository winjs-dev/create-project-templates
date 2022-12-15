module.exports = {
  // 对指定格式文件 在提交的时候执行相应的修复命令
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write', 'git add .'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write --parser json'],
  'package.json': ['prettier --write', 'sort-package-json'],
  'src/**/*.vue': ['eslint --fix', 'stylelint --fix', 'prettier --write', 'git add .'],
  'src/**/*.{scss,less,styl,css}': ['stylelint --fix', 'prettier --write', 'git add .'],
  '*.md': ['prettier --write']
};
