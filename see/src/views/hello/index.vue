<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <img class="logo" src="@/assets/img/logo.png" alt="logo" />
      <h1>{{ title }}</h1>
      <p>
        有关自定义配置指引， 请前往
        <a href="https://cloud-templates.github.io/create-project/" target="_blank" rel="noopener"
          >create-project 文档</a
        >.
      </p>
      <div class="demo">
        <h3>方法示例</h3>
        <pre>
          &lt;template&gt;
             &lt;div class=&quot;page page-hello&quot;&gt;
              &lt;div class=&quot;page-content&quot;&gt;
                &lt;!-- 静态资源路径写法事例 --&gt;
                &lt;img src=&quot;@/assets/img/logo.png&quot; /&gt;
                &lt;h1 v-text=&quot;msg&quot;&gt;&lt;/h1&gt;
                &lt;h2 v-text=&quot;message&quot;&gt;&lt;/h2&gt;
                &lt;svg-icon icon-name=&quot;dog&quot;&gt;&lt;/svg-icon&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/template&gt;
          &lt;script&gt;
            /**
             * 以下仅为事例代码，可以随意扩展修改
             */
            // 工具类
            import { formatDate } from &#x27;utils&#x27;;

            export default {
              data() {
                return {
                  msg: &#x27;Welcome to Your Vue.js App&#x27;,
                  message: &#x27;现在时间是：&#x27; + formatDate(Date.now())
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
                        method: &#x27;get&#x27;,
                        data
                      })
                      .then((res) =&gt; {
                        console.log(&#x27;接口请求成功：&#x27; + JSON.stringify(res, null, 2));
                      })
                      .catch((err) =&gt; {
                        console.log(&#x27;接口请求异常：&#x27; + err);
                      });
                }
              }
            };
          &lt;/script&gt;
          &lt;style lang=&quot;less&quot; scoped src=&quot;./style.less&quot;&gt;&lt;/style&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */
  export default {
    data() {
      return {
        title: 'Welcome to Your Vue.js App'
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
