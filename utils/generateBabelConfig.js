import ejs from 'ejs';

const babelConfig = `const plugins = [];
<%_ if (!needsTypeScript) { _%>
<%_ if (uiFramework === 'vant') { _%>
plugins.push(
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
);
<%_ } else if (uiFramework === 'wui') { _%>
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
<%_ } _%>
<%_ } _%>
module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins
};
`;

export default function generateBabelConfig({ uiFramework, needsTypeScript }) {
  return ejs.render(babelConfig, {
    uiFramework,
    needsTypeScript
  });
}
