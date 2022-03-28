import ejs from 'ejs';

const styleImportConfig = `/**
 * Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
<%_ if (uiFramework === 'wui') { _%> 
import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    libs: [
      {
        libraryName: '@winner-fed/win-ui',
        esModule: true,
        resolveStyle: (name) => {
          return \`@winner-fed/win-ui/es/\${name}/style\`;
        }
      }
    ]
  });
  return styleImportPlugin;
}
<%_ } else if (uiFramework === 'vant') { _%>
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    resolves: [VantResolve()]
  });
  return styleImportPlugin;
}

<%_ } else if (uiFramework === 'element-ui' && framework === 'v3') { _%>
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    resolves: [ElementPlusResolve()]
  });
  return styleImportPlugin;
}

<%_ } else if (uiFramework === 'ant' && framework === 'v3') { _%>
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({ 
    resolves: [AndDesignVueResolve()]
  });
  return styleImportPlugin;
}

<%_ } else { _%>
import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    // 自定义 lib
    libs: []
  });
  return styleImportPlugin;
}
<%_ } _%>
`;

export default function generateViteStyleImport({ uiFramework, framework }) {
  return ejs.render(styleImportConfig, {
    uiFramework,
    framework
  });
}
