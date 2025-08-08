<template>
  <view class="index">
    <text class="msg">{{ msg }}</text>
    <button type="primary" class="btn" @tap="handleTap">跳转详情</button>
  </view>
</template>

<script>
  import Hola from '@holajs/hola';
  import './index.less';

  export default {
    data() {
      return {
        msg: 'Hello world!'
      };
    },
    methods: {
      handleTap() {
        Hola.navigateTo({
          url: '/pages/detail/index'
        });
      }
    }
  };
</script>
