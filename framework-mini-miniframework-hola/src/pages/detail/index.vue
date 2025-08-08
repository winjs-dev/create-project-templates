<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script>
  import './index.less';

  export default {
    data() {
      return {
        msg: '现如今市面上端的形态多种多样，Web、快应用、微信小程序等各种端大行其道。当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。'
      };
    }
  };
</script>
