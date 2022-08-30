<script>
  export default {
    // 全局变量在此定义
    globalData: {
      query: {}, // 页面跳转时传递数据使用
      backData: '', // 页面返回时传递数据使用
      SERVER: {
        API_HOME: 'http://localhost:8080/',
        PREFIX: '/test'
      }
    },
    onLaunch: function () {
      console.log('App Launch');
    },
    onShow: function () {
      console.log('App Show');
    },
    onHide: function () {
      console.log('App Hide');
    }
  };
</script>

<style>
  /*每个页面公共css */
</style>
