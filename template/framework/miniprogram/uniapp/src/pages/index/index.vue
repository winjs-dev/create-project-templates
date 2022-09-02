<template>
  <view class="page page-index">
    <image class="logo" src="/static/img/logo.png" @click="testGoWithQuery"></image>
    <view>
      <text class="title" @click="testGo">{{ title }}</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello world'
      };
    },
    onLoad() {},
    onReady() {
      this.testRequest();
    },
    onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内分享按钮
        console.log(res.target);
      }
      console.log('onShareAppMessage', res);
      return {
        title: '自定义分享标题',
        path: '/pages/test/test?id=123',
        success(res) {
          console.log('res', res);
        }
      };
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
  .page-index {
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
