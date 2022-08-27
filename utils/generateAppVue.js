import ejs from 'ejs';

const appVue = `<template>
  <div id="<%= appContainerName %>" class="<%= packageName %>-container">
    <template v-if="isFrame">
      <frame-layout>
        <div class="pages">
          <keep-alive v-if="$route.meta.keepAlive">
            <router-view />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
        </div>
      </frame-layout>
    </template>
    <template v-else>
      <QuickNavigation />
      <div class="pages">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </template>
  </div>
</template>

<script>
  import { QuickNavigation, FrameLayout } from '@/components';

  export default {
    name: 'App',
    components: {
      QuickNavigation,
      FrameLayout
    },
    data() {
      return {
        // 是否使用财富中台外框架
        isFrame: !process.env.VUE_APP_IS_QIANKUN
      };
    }
  };
</script>
<style lang="less">
.<%= packageName %>-container {
  .iconfont {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
`;

export default function generateAppVue({
  needsQiankunMicroFrontend,
  appContainerName,
  packageName
}) {
  return ejs.render(appVue, {
    needsQiankunMicroFrontend,
    appContainerName,
    packageName
  });
}
