/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/vbenjs/vite-plugin-html/
 */
import path from 'path';
import fs from 'fs-extra';
import { createHtmlPlugin } from 'vite-plugin-html';

export function configHtmlPlugin(env, isBuild) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;
  const suffix = fs.existsSync(path.join(process.cwd(), 'tsconfig.json')) ? '.ts' : '.js';
  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    entry: `/src/main${suffix}`,
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_GLOB_APP_TITLE,
        // html 文件注入 BASE_URL，和 vue-cli 保持一致
        BASE_URL: VITE_PUBLIC_PATH,
        injectScript: `<script src="${VITE_PUBLIC_PATH}console.js?_t=${Date.now()}"></script>`
      }
    }
  });
  return htmlPlugin;
}
