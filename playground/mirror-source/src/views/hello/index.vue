<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <img src="@/assets/img/logo.png" alt="logo"/>
      <h1>{{ title }}</h1>
      <h2 v-text="message"></h2>
      <p>
        有关配置和自定义项目的指引,<br>
        请前往
        <a href="https://cloud-templates.github.io/create-project/" target="_blank" rel="noopener">create-project 文档</a>.
      </p>
    </div>
  </div>
</template>

<script>
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */
  // 工具类
  import { formatDate } from 'utils';

  export default {
    data() {
      return {
        title: 'Welcome to Your Vue.js App',
        message: '现在时间是：' + formatDate(Date.now())
      };
    },

    created() {
      this.movieComingSoon();
    },

    methods: {
      movieComingSoon() {
        const data = {};
        this.$services
          .octocat({
            method: 'get',
            data
          })
          .then((res) => {
            console.log('接口请求成功：' + JSON.stringify(res, null, 2));
          })
          .catch((err) => {
            console.log('接口请求异常：' + err);
          });
      }
    }
  };
</script>

<style lang="less" scoped src="./style.less"></style>
