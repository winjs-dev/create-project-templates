import ejs from 'ejs';

const styleImportConfig = `/**
 * Introduces component library styles on demand.
 * https://github.com/onebay/vite-plugin-imp/
 */
import vitePluginImp from 'vite-plugin-imp';

<%_ if (uiFramework === 'wui') { _%> 
export function configStyleImportPlugin() {
  const styleImportPlugin = vitePluginImp({
    libList: [
      {
        libName: '@winner-fed/win-ui',
        style: (name) => {
          return \`@winner-fed/win-ui/es/\${name}/style/index\`;
        }
      }
    ]
  });
  return styleImportPlugin;
}
<%_ } else if (uiFramework === 'vant') { _%>
export function configStyleImportPlugin() {
  const styleImportPlugin = vitePluginImp();
  return styleImportPlugin;
}

<%_ } else if (uiFramework === 'element-ui' && framework === 'v3') { _%>
export function configStyleImportPlugin() {
  const styleImportPlugin = vitePluginImp();
  return styleImportPlugin;
}

<%_ } else if (uiFramework === 'ant' && framework === 'v3') { _%>
export function configStyleImportPlugin() {
  const styleImportPlugin = vitePluginImp();
  return styleImportPlugin;
}

<%_ } else { _%>
export function configStyleImportPlugin() {
  const styleImportPlugin = vitePluginImp({
    // 自定义 lib
    libList: []
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
