/**
 * Introduces component library styles on demand.
 * https://github.com/onebay/vite-plugin-imp/
 */
import vitePluginImp from 'vite-plugin-imp';

export function configStyleImportPlugin() {
  const styleImportPlugin = vitePluginImp({
    libList: [
        {
          libName: 'vant',
          style(name) {
            return `vant/es/${name}/style/index`
          }
        },
      ]
  });
  return styleImportPlugin;
}

