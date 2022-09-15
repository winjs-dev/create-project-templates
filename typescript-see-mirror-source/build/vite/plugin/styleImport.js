/**
 * Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    // 自定义 lib
    libs: []
  });
  return styleImportPlugin;
}
