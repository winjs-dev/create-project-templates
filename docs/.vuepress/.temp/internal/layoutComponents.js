import { defineAsyncComponent } from 'vue';

export const layoutComponents = {
  404: defineAsyncComponent(() =>
    import(
      '/Users/liwenbo/Desktop/liwb_work/github/create-project/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue'
    )
  ),
  Layout: defineAsyncComponent(() =>
    import(
      '/Users/liwenbo/Desktop/liwb_work/github/create-project/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue'
    )
  )
};
