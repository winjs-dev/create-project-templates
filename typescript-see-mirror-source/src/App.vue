<template>
  <div id="typescriptSeeMirrorSource38m8n73tdd" class="typescript-see-mirror-source-container">
    <div class="pages">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    name: 'App'
  })
  export default class App extends Vue {}
</script>
