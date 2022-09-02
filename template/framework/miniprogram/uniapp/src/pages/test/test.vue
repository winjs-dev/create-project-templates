<template>
  <view class="page page-test">
    <image class="logo" :src="require('../../assets/img/logo_uniapp.png')" @click="testGoWithQuery"></image>
    <view>
      <text class="title" @click="testGo">{{ title }}</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Test'
      };
    },
    onLoad() {},
    onReady() {
      this.testRequest();
    },
    methods: {
      testRequest() {
        this.$services
          .index({
            method: 'get',
            data: { index: '首页发的请求' }
          })
          .then((data) => {
            console.log('data: ', data);
          });
      },
      testGo() {
        this.$services.test(null);
        // this.$go('test')
      },
      testGoWithQuery() {
        this.$go({
          name: 'test',
          query: {
            test: '测试页面用到的数据'
          }
        });
      }
    }
  };
</script>

<style>
  .page-test {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200px;
    width: 200px;
    margin: 200px auto 50px auto;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36px;
    color: #8f8f94;
  }
</style>
