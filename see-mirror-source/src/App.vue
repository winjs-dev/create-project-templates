<template>
  <div id="seeMirrorSourceoass8d0uku" class="see-mirror-source-container">
    <div class="pages">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  };
</script>
