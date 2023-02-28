import legacy from '@vitejs/plugin-legacy';
import browserslist from 'browserslist';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from '@winner-fed/unplugin-vue-setup-extend/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import svgLoader from 'vite-svg-loader';

import { configHtmlPlugin } from './html';
import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
import { configImageminPlugin } from './imagemin';
import { configSvgIconsPlugin } from './svgSprite';

const browserslistConfig = browserslist.loadConfig({ path: '.' });

export function createVitePlugins(viteEnv, isBuild) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins = [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      dts: true,
      eslintrc: {
        enabled: true
      },
      imports: [
        'vue',
        'vue-router',
        {
          '@/services': [
            ['default', 'services']
          ]
        }
      ]
    }),
    Components({}),
    svgLoader()
  ];

  // @vitejs/plugin-legacy
  VITE_LEGACY &&
    isBuild &&
    vitePlugins.push(
      legacy({
        targets: browserslistConfig,
        ignoreBrowserslistConfig: false,
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        /**
         * Polyfills required by modern browsers
         *
         * Since some low-version modern browsers do not support the new syntax
         * You need to load polyfills corresponding to the syntax to be compatible
         * At build, all required polyfills are packaged according to the target browser version range
         * But when the page is accessed, only the required part is loaded depending on the browser version
         *
         * Two configuration methods:
         *
         * 1. true
         *  - Automatically load all required polyfills based on the target browser version range
         *  - Demerit: will introduce polyfills that are not needed by modern browsers in higher versions,
         *    as well as more aggressive polyfills.
         *
         * 2、string[]
         *  - Add low-version browser polyfills as needed
         *  - Demerit: It needs to be added manually, which is inflexible;
         *    it will be discovered after the production is deployed, resulting in production failure! ! !
         */
        modernPolyfills: ['es/global-this']
      })
    );

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-imp
  vitePlugins.push(configStyleImportPlugin());

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  // The following plugins only work in the production environment
  if (isBuild) {
    //vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }

  return vitePlugins;
}
