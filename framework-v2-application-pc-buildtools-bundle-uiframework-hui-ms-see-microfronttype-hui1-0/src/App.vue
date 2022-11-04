<template>
  <div id="frameworkV2ApplicationPcBuildtoolsBundleUiframeworkHuiMsSeeMicrofronttypeHui101k97872wtap" class="framework-v2-application-pc-buildtools-bundle-uiframework-hui-ms-see-microfronttype-hui1-0-container">
    <template v-if="isProd">
      <div class="pages">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </template>
    <template v-else>
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
        isFrame: !(process.env.VUE_APP_MICRO_MODE === 'qiankun'),
        isProd: process.env.NODE_ENV === 'production'
      };
    }
  };
</script>

<style lang="less">
.framework-v2-application-pc-buildtools-bundle-uiframework-hui-ms-see-microfronttype-hui1-0-container {
  .pages {
    overflow: auto;
    height: 100%;
  }

  .iconfont {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
