import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { createVitePlugins } from './build/vite/plugin';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/vite/utils';

function pathResolve(dir) {
  return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          // @/xxxx  =>  src/xxx
          find: /^@\//,
          replacement: pathResolve('./src') + '/'
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('./types') + '/'
        },
        {
          find: /^utils/,
          replacement: pathResolve('node_modules/@winner-fed/cloud-utils/dist/cloud-utils.esm')
        }
      ]
    },
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
      hmr: {
        overlay: true
      }
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome51',
      outDir: 'dist',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE
        }
      },
      // Turning off brotliSize display can slightly reduce packaging time
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.css$/.test(assetInfo.name)) {
              return 'static/css/[name].[hash][extname]';
            }
            if (/\.(gif|png|jpe?g|svg)(\?\S*)?$/.test(assetInfo.name)) {
              return 'static/img/[name].[hash][extname]';
            }
            if (/\.(otf|ttf|woff2?|eot)(\?\S*)?$/.test(assetInfo.name)) {
              return 'static/fonts/[name].[hash][extname]';
            }

            return 'static/[ext]/[name].[hash][extname]';
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/assets/style/variable.less";@import "@winner-fed/magicless/magicless.less";`,
          modifyVars: {
            // Used for global import to avoid the need to import each style file separately
            // reference:  Avoid repeated references
          },
          javascriptEnabled: true
        }
      }
    },
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, isBuild),

    optimizeDeps: {
      include: ['vue', 'vue-router'],
      exclude: ['vue-demi']
    }
  };
});
