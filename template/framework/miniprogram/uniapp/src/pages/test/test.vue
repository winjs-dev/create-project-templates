<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" @click="testGoWithQuery"></image>
    <view>
      <text class="title" @click="testGo">{{ title }}</text>
      <button type="primary" @click="gotoOfflinePackage">跳转离线包</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello'
      };
    },
    onLoad() {},
    onReady() {
      // this.testRequest();
      // my.getSystemInfo({
      //   success: (res) => {
      //     my.alert({
      //       content: JSON.stringify(res)
      //     });
      //     console.log('success', res);
      //   }
      // });
      //
      // my.alert({
      //   content: my.SDKVersion
      // });
      //
      // my.call('winner_account.getPhone', {}, (res) => {
      //   my.alert({ content: JSON.stringify(res)});
      //   console.log(res)
      // });
    },
    methods: {
      gotoOfflinePackage() {
        // 跳转离线包
        my.call(
          'startApp',
          {
            appId: '12121212',
            param: {
              url: '/dist/business.html?key=value'
            }
          },
          (res) => {
            my.alert({ content: JSON.stringify(res) });
            console.log(res);
          }
        );
      },
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
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200 rpx;
    width: 200 rpx;
    margin: 200 rpx auto 50 rpx auto;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36 rpx;
    color: #8f8f94;
  }
</style>
