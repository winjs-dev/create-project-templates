/**
 * Introduces component library styles on demand.
 * https://github.com/onebay/vite-plugin-imp/
 */
import vitePluginImp from 'vite-plugin-imp';

export function configStyleImportPlugin() {
  const styleImportPlugin = vitePluginImp();
  return styleImportPlugin;
}

