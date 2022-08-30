import ejs from 'ejs';
import { microFrontTypeEnum } from './dictionary.js';

const appVueV2 = `<template>
  <div id="<%= appContainerName %>" class="<%= packageName %>-container">
    <%_ if (application === 'pc' && microFrontType.length) {_%>
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
    <%_ } else { _%>
    <div class="pages">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <%_ } _%>
  </div>
</template>

<%_ if (application === 'pc' && microFrontType.length) { _%>
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
.<%= packageName %>-container {
  .iconfont {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
<%_ } else if (needsTypeScript) { _%>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    name: 'App'
  })
  export default class App extends Vue {}
</script>
<%_ } else { _%>
<script>
  export default {
    name: 'App'
  };
</script>
<%_ } _%>
`;

const appVueV3 = `<template>
  <div class="pages">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<%_ if (needsTypeScript) { _%>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App'
  });
</script>
<%_ } else { _%>
<script>
  export default {
    name: 'App'
  };
</script>
<%_ } _%>
`;

export function generateAppVue({
  microFrontType,
  appContainerName,
  packageName,
  needsTypeScript,
  application
}) {
  return ejs.render(appVueV2, {
    microFrontType,
    appContainerName,
    packageName,
    needsTypeScript,
    application
  });
}

export function generateAppVueV3({
  microFrontType,
  appContainerName,
  packageName,
  needsTypeScript,
  application
}) {
  return ejs.render(appVueV3, {
    microFrontType,
    appContainerName,
    packageName,
    needsTypeScript,
    application
  });
}
