<template>
  <div id="default6rv9vlmp7qk" class="default-container">
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
