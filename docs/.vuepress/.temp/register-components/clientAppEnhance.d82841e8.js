import { defineAsyncComponent } from 'vue';

export default ({ app }) => {
  app.component(
    'NpmBadge',
    defineAsyncComponent(() =>
      import(
        '/Users/liwenbo/Desktop/liwb_work/github/create-project/docs/.vuepress/components/NpmBadge.vue'
      )
    )
  );
};
