<template
  ><h1 id="目录及约定" tabindex="-1"
    ><a class="header-anchor" href="#目录及约定" aria-hidden="true">#</a> 目录及约定</h1
  >
  <p>在文件和目录的组织上，更倾向于选择约定的方式。</p>
  <p>一个应用的基本目录结构如下：</p>
  <div class="language-bash ext-sh line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #DCDCAA">.</span></span>
<span class="line"><span style="color: #D4D4D4">├── build</span></span>
<span class="line"><span style="color: #D4D4D4">├── docs</span></span>
<span class="line"><span style="color: #D4D4D4">├── public</span></span>
<span class="line"><span style="color: #D4D4D4">└── src</span></span>
<span class="line"><span style="color: #D4D4D4">    ├── assets</span></span>
<span class="line"><span style="color: #D4D4D4">    │   ├── fonts</span></span>
<span class="line"><span style="color: #D4D4D4">    │   ├── img</span></span>
<span class="line"><span style="color: #D4D4D4">    │   └── style</span></span>
<span class="line"><span style="color: #D4D4D4">    ├── components</span></span>
<span class="line"><span style="color: #D4D4D4">    │   ├── NetworkBroken</span></span>
<span class="line"><span style="color: #D4D4D4">    │   ├── SendCode</span></span>
<span class="line"><span style="color: #D4D4D4">    │   └── global</span></span>
<span class="line"><span style="color: #D4D4D4">    ├── filters</span></span>
<span class="line"><span style="color: #D4D4D4">    ├── icons</span></span>
<span class="line"><span style="color: #D4D4D4">    │   └── svg</span></span>
<span class="line"><span style="color: #D4D4D4">    ├── models</span></span>
<span class="line"><span style="color: #D4D4D4">    ├── router</span></span>
<span class="line"><span style="color: #D4D4D4">    ├── services</span></span>
<span class="line"><span style="color: #D4D4D4">    ├── vendor</span></span>
<span class="line"><span style="color: #D4D4D4">    └── views</span></span>
<span class="line"><span style="color: #D4D4D4">        └── hello</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span><br /><span
        class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number">8</span><br /><span
        class="line-number"
        >9</span
      ><br /><span class="line-number">10</span><br /><span class="line-number">11</span><br /><span
        class="line-number"
        >12</span
      ><br /><span class="line-number">13</span><br /><span class="line-number">14</span><br /><span
        class="line-number"
        >15</span
      ><br /><span class="line-number">16</span><br /><span class="line-number">17</span><br /><span
        class="line-number"
        >18</span
      ><br /><span class="line-number">19</span><br /><span class="line-number">20</span><br /><span
        class="line-number"
        >21</span
      ><br /><span class="line-number">22</span><br /></div></div
  ><h2 id="build" tabindex="-1"
    ><a class="header-anchor" href="#build" aria-hidden="true">#</a> build</h2
  >
  <p>构建工具（webpack/vite） 及 node 命令行工具相关配置</p>
  <ul>
    <li>index.js - 利用 tasksfile 插件，自定义打包构建之后的异常，便于捕获。</li>
    <li>zip.js - 将构建的 dist 包压缩成 zip 格式。</li>
  </ul>
  <h2 id="public" tabindex="-1"
    ><a class="header-anchor" href="#public" aria-hidden="true">#</a> public</h2
  >
  <p
    >该目录下的文件不会被构建工具（webpack/vite）处理，构建的包最终是原样输出。而其他的静态资源都会被构建工具（webpack/vite）当做模块处理。</p
  >
  <ul>
    <li>前端配置文件，<code>config.local.js</code>，一般用于配置动态的后端接口路径等</li>
    <li
      >移动端调试工具，如腾讯的
      <a href="https://github.com/Tencent/vConsole" target="_blank" rel="noopener noreferrer"
        >vconsole.min.js<ExternalLinkIcon /></a
      >。考虑到此文件并不是开发时必须引入的，因此
      <code>console.js</code> 主要用来实现动态加载此文件的。</li
    >
  </ul>
  <h2 id="src" tabindex="-1"><a class="header-anchor" href="#src" aria-hidden="true">#</a> src</h2>
  <p>约定 <code>src</code> 为源码目录。</p>
  <h2 id="src-assets" tabindex="-1"
    ><a class="header-anchor" href="#src-assets" aria-hidden="true">#</a> src/assets</h2
  >
  <p>用于静态资源文件，作用于全局</p>
  <ul>
    <li
      >fonts - font 字体图标，默认是
      <a href="https://www.iconfont.cn/" target="_blank" rel="noopener noreferrer"
        >iconfont.cn<ExternalLinkIcon
      /></a>
      生成的全部文件</li
    >
    <li>img - 图片资源文件</li>
    <li
      >style - CSS 相关样式文件，<code>reset</code> 样式文件及全局定义的
      <code>less</code> 变量文件，自定义的 <code>mixins</code> 函数库，换肤文件等</li
    >
    <li>js - 不经过 npm 或 Yarn 下载的第三方依赖包。（扩展出来的文件）</li>
  </ul>
  <h2 id="src-components" tabindex="-1"
    ><a class="header-anchor" href="#src-components" aria-hidden="true">#</a> src/components</h2
  >
  <p>组件目录，统一采用大驼峰拼接，如 SendCode</p>
  <h2 id="src-filters" tabindex="-1"
    ><a class="header-anchor" href="#src-filters" aria-hidden="true">#</a> src/filters</h2
  >
  <p>过滤器，过滤器是 vue2 的叫法，在 Vue3 是不存在的。Vue3 可以理解成是函数库</p>
  <h2 id="src-icons" tabindex="-1"
    ><a class="header-anchor" href="#src-icons" aria-hidden="true">#</a> src/icons</h2
  >
  <p
    >放置 svg 相关的图标。可以作为 iconfont 的替代品，因为 iconfont
    只支持单色。项目里推荐使用这种方式。</p
  >
  <h2 id="src-models" tabindex="-1"
    ><a class="header-anchor" href="#src-models" aria-hidden="true">#</a> src/models</h2
  >
  <p
    >数据生产者。可以按照前端领域模型来组织。项目中的数据来源，主要是后端接口（HTTP
    协议的接口），及混合式开发时，壳子这边提供的桥接接口。或者是接入的第三方插件提供的数据。</p
  >
  <ul>
    <li>复用，解耦，使用方便。</li>
    <li
      >注释清晰，遵循 jsdoc 的注释规范，利用 <code>npm scripts</code>里的
      <code>gen:docs</code>生成可视化的前端接口文档。</li
    >
    <li>纯前端的 BFF 层，视图和业务逻辑的胶水层。</li>
  </ul>
  <h2 id="src-router" tabindex="-1"
    ><a class="header-anchor" href="#src-router" aria-hidden="true">#</a> src/router</h2
  >
  <p>路由及路由拦截器</p>
  <h2 id="src-services" tabindex="-1"
    ><a class="header-anchor" href="#src-services" aria-hidden="true">#</a> src/services</h2
  >
  <p>网络请求库的封装。对 HTTP 协议接口做的封装。</p>
  <ul>
    <li
      >autoMatchBaseUrl.js - 项目中若存在多个服务端接口的对接，则需要在 config.local.js
      里定义多个接口请求路径，此文件就是针对配置不同的 prefix，做自动适配的。可参考下面一段示例：
      <em>autoMatchBaseUrl 与 config.local.js 配合使用</em></li
    >
    <li>request.js - 针对 axios 的封装，主要函数是 URL, URL, formData)</li>
    <li
      >RESTFULURL.js - 所有服务端接口的映射表，对应的 value 值不建议添加接口具体的
      path，可参考下面一段示例： <em>RESTFULURL.js</em> 示例， 如标准的 URL
      <code>http://xx.com/v1/func_get_user_info</code>
      <ul>
        <li
          >HTTP 协议路径
          <a href="http://xx.com/" target="_blank" rel="noopener noreferrer"
            >http://xx.com/<ExternalLinkIcon /></a
        ></li>
        <li>path 路径：v1/</li>
        <li>接口名：<code>[func_get_user_info](http://xx.com/v1/func_get_user_info)</code></li>
        <li
          >因为有时候开发环境和生产环境接口对应 path 会有修改，所以在配置 API_HOME 的时候，尽量是
          HTTP 协议路径 + path 路径。</li
        >
      </ul>
    </li>
  </ul>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #6A9955">// autoMatchBaseUrl与config.local.js配合使用</span></span>
<span class="line"><span style="color: #6A9955">// config.local.js</span></span>
<span class="line"><span style="color: #9CDCFE">window</span><span style="color: #D4D4D4">.</span><span style="color: #4FC1FF">LOCAL_CONFIG</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">API_HOME:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;http://api.github.com/&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">CLINET_API_HOME:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;http://client.github.com/&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">MALL_API_HOME:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;http://mall.github.com/&#39;</span></span>
<span class="line"><span style="color: #D4D4D4">};</span></span>
<span class="line"></span>
<span class="line"><span style="color: #6A9955">// constant.js</span></span>
<span class="line"><span style="color: #569CD6">const</span><span style="color: #D4D4D4"> </span><span style="color: #4FC1FF">QUOTE_PREFIX</span><span style="color: #D4D4D4"> = </span><span style="color: #CE9178">&#39;v1/&#39;</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #569CD6">const</span><span style="color: #D4D4D4"> </span><span style="color: #4FC1FF">CLIENT_PREFIX</span><span style="color: #D4D4D4"> = </span><span style="color: #CE9178">&#39;client/&#39;</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #569CD6">const</span><span style="color: #D4D4D4"> </span><span style="color: #4FC1FF">MALL_PREFIX</span><span style="color: #D4D4D4"> = </span><span style="color: #CE9178">&#39;shop/&#39;</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #C586C0">export</span><span style="color: #D4D4D4"> { </span><span style="color: #9CDCFE">QUOTE_PREFIX</span><span style="color: #D4D4D4">, </span><span style="color: #9CDCFE">CLIENT_PREFIX</span><span style="color: #D4D4D4">, </span><span style="color: #9CDCFE">MALL_PREFIX</span><span style="color: #D4D4D4"> };</span></span>
<span class="line"></span>
<span class="line"><span style="color: #6A9955">// autoMatchBaseUrl.js</span></span>
<span class="line"><span style="color: #C586C0">export</span><span style="color: #D4D4D4"> </span><span style="color: #C586C0">default</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">function</span><span style="color: #D4D4D4"> </span><span style="color: #DCDCAA">autoMatchBaseUrl</span><span style="color: #D4D4D4">(</span><span style="color: #9CDCFE">prefix</span><span style="color: #D4D4D4">) {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #569CD6">const</span><span style="color: #D4D4D4"> </span><span style="color: #4FC1FF">options</span><span style="color: #D4D4D4"> = {};</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #C586C0">switch</span><span style="color: #D4D4D4"> (</span><span style="color: #9CDCFE">prefix</span><span style="color: #D4D4D4">) {</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #C586C0">case</span><span style="color: #D4D4D4"> </span><span style="color: #4FC1FF">QUOTE_PREFIX</span><span style="color: #D4D4D4">:</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">headers</span><span style="color: #D4D4D4"> = { </span><span style="color: #CE9178">&#39;Content-Type&#39;</span><span style="color: #9CDCFE">:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;application/x-www-form-urlencoded&#39;</span><span style="color: #D4D4D4"> };</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">baseUrl</span><span style="color: #D4D4D4"> = </span><span style="color: #9CDCFE">window</span><span style="color: #D4D4D4">.</span><span style="color: #4FC1FF">LOCAL_CONFIG</span><span style="color: #D4D4D4">.</span><span style="color: #4FC1FF">QUOTE_HOME</span><span style="color: #D4D4D4"> + </span><span style="color: #4FC1FF">QUOTE_PREFIX</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #C586C0">break</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #C586C0">case</span><span style="color: #D4D4D4"> </span><span style="color: #4FC1FF">CLIENT_PREFIX</span><span style="color: #D4D4D4">:</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">data</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #9CDCFE">user_token:</span><span style="color: #D4D4D4"> </span><span style="color: #9CDCFE">store</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">getters</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">clientToken</span></span>
<span class="line"><span style="color: #D4D4D4">      };</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">headers</span><span style="color: #D4D4D4"> = { </span><span style="color: #CE9178">&#39;Content-Type&#39;</span><span style="color: #9CDCFE">:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;application/x-www-form-urlencoded&#39;</span><span style="color: #D4D4D4"> };</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">baseUrl</span><span style="color: #D4D4D4"> = </span><span style="color: #9CDCFE">window</span><span style="color: #D4D4D4">.</span><span style="color: #4FC1FF">LOCAL_CONFIG</span><span style="color: #D4D4D4">.</span><span style="color: #4FC1FF">IFS_API_HOME</span><span style="color: #D4D4D4"> + </span><span style="color: #4FC1FF">CLIENT_PREFIX</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #C586C0">break</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #C586C0">case</span><span style="color: #D4D4D4"> </span><span style="color: #4FC1FF">MALL_PREFIX</span><span style="color: #D4D4D4">:</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">data</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #9CDCFE">fansToken:</span><span style="color: #D4D4D4"> </span><span style="color: #9CDCFE">encrypt</span><span style="color: #D4D4D4">.</span><span style="color: #DCDCAA">encrypt</span><span style="color: #D4D4D4">(</span><span style="color: #9CDCFE">store</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">getters</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">userInfo</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">fundAccount</span><span style="color: #D4D4D4">)</span></span>
<span class="line"><span style="color: #D4D4D4">      };</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">headers</span><span style="color: #D4D4D4"> = { </span><span style="color: #CE9178">&#39;Content-Type&#39;</span><span style="color: #9CDCFE">:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;application/x-www-form-urlencoded&#39;</span><span style="color: #D4D4D4"> };</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">baseUrl</span><span style="color: #D4D4D4"> = </span><span style="color: #9CDCFE">window</span><span style="color: #D4D4D4">.</span><span style="color: #4FC1FF">LOCAL_CONFIG</span><span style="color: #D4D4D4">.</span><span style="color: #4FC1FF">MALL_API_HOME</span><span style="color: #D4D4D4"> + </span><span style="color: #4FC1FF">MALL_PREFIX</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #C586C0">break</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #C586C0">default</span><span style="color: #D4D4D4">:</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #6A9955">// 默认</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">data</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #9CDCFE">user_token:</span><span style="color: #D4D4D4"> </span><span style="color: #9CDCFE">store</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">getters</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">apiToken</span></span>
<span class="line"><span style="color: #D4D4D4">      };</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">headers</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #9CDCFE">Accept:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;application/json&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;Content-Type&#39;</span><span style="color: #9CDCFE">:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;application/x-www-form-urlencoded; charset=utf-8&#39;</span></span>
<span class="line"><span style="color: #D4D4D4">      };</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">.</span><span style="color: #9CDCFE">baseUrl</span><span style="color: #D4D4D4"> = </span><span style="color: #9CDCFE">window</span><span style="color: #D4D4D4">.</span><span style="color: #4FC1FF">LOCAL_CONFIG</span><span style="color: #D4D4D4">.</span><span style="color: #4FC1FF">API_HOME</span><span style="color: #D4D4D4"> + </span><span style="color: #4FC1FF">HOME_PREFIX</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #D4D4D4">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #C586C0">return</span><span style="color: #D4D4D4"> </span><span style="color: #9CDCFE">options</span><span style="color: #D4D4D4">;</span></span>
<span class="line"><span style="color: #D4D4D4">}</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span><br /><span
        class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number">8</span><br /><span
        class="line-number"
        >9</span
      ><br /><span class="line-number">10</span><br /><span class="line-number">11</span><br /><span
        class="line-number"
        >12</span
      ><br /><span class="line-number">13</span><br /><span class="line-number">14</span><br /><span
        class="line-number"
        >15</span
      ><br /><span class="line-number">16</span><br /><span class="line-number">17</span><br /><span
        class="line-number"
        >18</span
      ><br /><span class="line-number">19</span><br /><span class="line-number">20</span><br /><span
        class="line-number"
        >21</span
      ><br /><span class="line-number">22</span><br /><span class="line-number">23</span><br /><span
        class="line-number"
        >24</span
      ><br /><span class="line-number">25</span><br /><span class="line-number">26</span><br /><span
        class="line-number"
        >27</span
      ><br /><span class="line-number">28</span><br /><span class="line-number">29</span><br /><span
        class="line-number"
        >30</span
      ><br /><span class="line-number">31</span><br /><span class="line-number">32</span><br /><span
        class="line-number"
        >33</span
      ><br /><span class="line-number">34</span><br /><span class="line-number">35</span><br /><span
        class="line-number"
        >36</span
      ><br /><span class="line-number">37</span><br /><span class="line-number">38</span><br /><span
        class="line-number"
        >39</span
      ><br /><span class="line-number">40</span><br /><span class="line-number">41</span><br /><span
        class="line-number"
        >42</span
      ><br /><span class="line-number">43</span><br /><span class="line-number">44</span><br /><span
        class="line-number"
        >45</span
      ><br /><span class="line-number">46</span><br /><span class="line-number">47</span><br /><span
        class="line-number"
        >48</span
      ><br /><span class="line-number">49</span><br /><span class="line-number">50</span
      ><br /></div></div
  ><div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #6A9955">// RESTFULURL.js</span></span>
<span class="line"><span style="color: #C586C0">export</span><span style="color: #D4D4D4"> </span><span style="color: #C586C0">default</span><span style="color: #D4D4D4"> {</span></span>
<span class="line"><span style="color: #D4D4D4">  ...</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">getUserInfo</span><span style="color: #D4D4D4">: </span><span style="color: #CE9178">&#39;func_get_user_info&#39;</span></span>
<span class="line"><span style="color: #D4D4D4">  ...</span></span>
<span class="line"><span style="color: #D4D4D4">}</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span><br /><span
        class="line-number"
        >6</span
      ><br /></div></div
  ><h2 id="src-views" tabindex="-1"
    ><a class="header-anchor" href="#src-views" aria-hidden="true">#</a> src/views</h2
  >
  <p>视图层，数据的消费者。尽可能的让视图层更“轻”。</p>
  <ul>
    <li>统一采用小驼峰（切记），如 helloWorld</li>
  </ul>
  <h2 id="src-constant-js" tabindex="-1"
    ><a class="header-anchor" href="#src-constant-js" aria-hidden="true">#</a> src/constant.js</h2
  >
  <p
    >定义常量（大驼峰，单词之间以下划线连接）。编写业务程序时，会有一些所需要的常量值，比如订单状态，1,2,3...。一般情况下，这些值都是固定不变的。如果直接将这些值硬编码到代码里，就可以理解成“魔法值”。魔法值的存在，从语法上来说是合理的，但是从业务上却让人无法理解其中
    0，1，2，3 的含义。对于这些魔法值，我们往往需要通过上下文推断出来逻辑，如果是非常复杂的业务或者
    10 年前的代码那就更惨了，搞不好连文档注释也没有。为了可读性，所以我们要尽量避免出现魔法值。
    举个例子，如下</p
  >
  <div class="language-vue ext-vue line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #6A9955">&lt;!-- 服务期限 --&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">&lt;div class=&quot;card-subscription viability-info&quot;&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">  &lt;div class=&quot;header&quot;&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">    &lt;span&gt;服务期限&lt;/span&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">  &lt;/div&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">  &lt;div class=&quot;content&quot;&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">    &lt;div v-if=&quot;+combinePrice.farePerMonth !== 999999999&quot;</span></span>
<span class="line"><span style="color: #D4D4D4">         class=&quot;viability-box&quot;</span></span>
<span class="line"><span style="color: #D4D4D4">         :class=&quot;{active: viability === &#39;1&#39; }&quot;</span></span>
<span class="line"><span style="color: #D4D4D4">         @click=&quot;viability = &#39;1&#39;&quot;&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">      &lt;p&gt;1个月&lt;/p&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">      &lt;p class=&quot;price&quot;&gt;&lt;b&gt;￥&lt;/b&gt;{{combinePrice.farePerMonth}}&lt;/p&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">    &lt;/div&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">    &lt;div v-if=&quot;+combinePrice.farePerQuarter !== 999999999&quot;</span></span>
<span class="line"><span style="color: #D4D4D4">         class=&quot;viability-box&quot;</span></span>
<span class="line"><span style="color: #D4D4D4">         :class=&quot;{active: viability === &#39;3&#39; }&quot;</span></span>
<span class="line"><span style="color: #D4D4D4">         @click=&quot;viability = &#39;3&#39;&quot;&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">      &lt;p&gt;3个月&lt;/p&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">      &lt;p class=&quot;price&quot;&gt;&lt;b&gt;￥&lt;/b&gt;{{combinePrice.farePerQuarter}}&lt;/p&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">    &lt;/div&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">    &lt;div v-if=&quot;+combinePrice.farePerHalfyear !== 999999999&quot;</span></span>
<span class="line"><span style="color: #D4D4D4">         class=&quot;viability-box&quot;</span></span>
<span class="line"><span style="color: #D4D4D4">         :class=&quot;{active: viability === &#39;6&#39; }&quot;</span></span>
<span class="line"><span style="color: #D4D4D4">         @click=&quot;viability = &#39;6&#39;&quot;&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">      &lt;p&gt;6个月&lt;/p&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">      &lt;p class=&quot;price&quot;&gt;&lt;b&gt;￥&lt;/b&gt;{{combinePrice.farePerHalfyear}}&lt;/p&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">    &lt;/div&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">&lt;/div&gt;</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span><br /><span
        class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number">8</span><br /><span
        class="line-number"
        >9</span
      ><br /><span class="line-number">10</span><br /><span class="line-number">11</span><br /><span
        class="line-number"
        >12</span
      ><br /><span class="line-number">13</span><br /><span class="line-number">14</span><br /><span
        class="line-number"
        >15</span
      ><br /><span class="line-number">16</span><br /><span class="line-number">17</span><br /><span
        class="line-number"
        >18</span
      ><br /><span class="line-number">19</span><br /><span class="line-number">20</span><br /><span
        class="line-number"
        >21</span
      ><br /><span class="line-number">22</span><br /><span class="line-number">23</span><br /><span
        class="line-number"
        >24</span
      ><br /><span class="line-number">25</span><br /><span class="line-number">26</span><br /><span
        class="line-number"
        >27</span
      ><br /><span class="line-number">28</span><br /></div></div
  ><p><code>999999999</code> 是什么玩意。。。</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #6A9955">// constant.js</span></span>
<span class="line"><span style="color: #D4D4D4">...</span></span>
<span class="line"><span style="color: #6A9955">// 中台与前端做的协定</span></span>
<span class="line"><span style="color: #6A9955">// 特殊 999999999 价格，不做界面展示</span></span>
<span class="line"><span style="color: #569CD6">const</span><span style="color: #D4D4D4"> </span><span style="color: #4FC1FF">SPECIAL_PRICE</span><span style="color: #D4D4D4"> = </span><span style="color: #B5CEA8">999999999</span><span style="color: #D4D4D4">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C586C0">export</span><span style="color: #D4D4D4"> {</span></span>
<span class="line"><span style="color: #D4D4D4">  ...</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">SPECIAL_PRICE</span></span>
<span class="line"><span style="color: #D4D4D4">};</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span><br /><span
        class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number">8</span><br /><span
        class="line-number"
        >9</span
      ><br /><span class="line-number">10</span><br /></div></div
  ><h2 id="index-html" tabindex="-1"
    ><a class="header-anchor" href="#index-html" aria-hidden="true">#</a> index.html</h2
  >
  <p
    >遵循于
    <a href="https://ejs.co/" target="_blank" rel="noopener noreferrer">EJS<ExternalLinkIcon /></a>
    嵌入式 JavaScript 模板引擎语法，比如
    <code>&lt;%% EJS %%&gt;</code>。可以动态设置并解析所定义的变量。</p
  >
  <ul>
    <li
      >配置文件 config.local.js
      的引用方式这里做下说明，由于之前生产环境上遇到过，更改配置文件并上传服务器更新后，有缓存的问题，因此用了
      <code>document.write</code> 方式实现，用于清除此文件的缓存</li
    >
  </ul>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #808080">&lt;</span><span style="color: #569CD6">script</span><span style="color: #808080">&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">  document.write(unescape(&#39;%3Cscript src=\&#39;./config.local.js?_t=&#39; + Math.random() + &#39;\&#39;</span></span>
<span class="line"><span style="color: #D4D4D4">  type=\&#39;text/javascript\&#39;%3E%3C/script%3E&#39;));</span></span>
<span class="line"><span style="color: #808080">&lt;/</span><span style="color: #569CD6">script</span><span style="color: #808080">&gt;</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /></div></div
  ><h3 id="src-public-index-html" tabindex="-1"
    ><a class="header-anchor" href="#src-public-index-html" aria-hidden="true">#</a>
    src/public/index.html</h3
  >
  <p
    >遵循 <code>vue-cli</code> 放置的目录规范。借助于
    <a
      href="https://github.com/jantimon/html-webpack-plugin"
      target="_blank"
      rel="noopener noreferrer"
      >html-webpack-plugin<ExternalLinkIcon
    /></a>
    来实现 EJS 的模板引擎语法。</p
  >
  <h3 id="src-index-html" tabindex="-1"
    ><a class="header-anchor" href="#src-index-html" aria-hidden="true">#</a> src/index.html</h3
  >
  <p
    >遵循 <code>vite</code> 放置的目录规范。借助于
    <a href="https://github.com/vbenjs/vite-plugin-html" target="_blank" rel="noopener noreferrer"
      >vite-plugin-html<ExternalLinkIcon
    /></a>
    来实现 EJS 的模板引擎语法。</p
  >
  <h2 id="env" tabindex="-1"><a class="header-anchor" href="#env" aria-hidden="true">#</a> .env</h2>
  <p>环境变量配置文件，会在所有的环境中被载入。</p>
  <h2 id="env-development" tabindex="-1"
    ><a class="header-anchor" href="#env-development" aria-hidden="true">#</a> .env.development</h2
  >
  <p>定义<strong>开发模式</strong>下的环境变量，只在<strong>开发模式</strong>下才被引入。</p>
  <h2 id="env-production" tabindex="-1"
    ><a class="header-anchor" href="#env-production" aria-hidden="true">#</a> .env.production</h2
  >
  <p>定义<strong>生产模式</strong>下的环境变量，只在<strong>生产模式</strong>下才被引入。</p>
  <h2 id="browserslistrc" tabindex="-1"
    ><a class="header-anchor" href="#browserslistrc" aria-hidden="true">#</a> .browserslistrc</h2
  >
  <p
    >用于在不同的前端工具之间共用目标浏览器和 node 版本的配置文件。主要用于
    <a href="https://github.com/postcss/autoprefixer" target="_blank" rel="noopener noreferrer"
      >Autoprefixer<ExternalLinkIcon /></a
    >、
    <a href="https://babeljs.io/" target="_blank" rel="noopener noreferrer"
      >Babel<ExternalLinkIcon
    /></a>
    等，详细可参考
    <a href="https://juejin.cn/post/6844903669524086797" target="_blank" rel="noopener noreferrer"
      >Browserslist<ExternalLinkIcon /></a
    >。移动端 H5 及 PC Web 的配置各有不同。</p
  >
  <p
    >一个在线工具，用于查看 browserlist 配置文件匹配到哪些浏览器：<a
      href="https://browserl.ist/?q=defaults"
      target="_blank"
      rel="noopener noreferrer"
      >https://browserl.ist/?q=defaults<ExternalLinkIcon
    /></a>
    注意：并不是项目中所有依赖都支持低版本浏览器，例如 vue 本身不支持低于 IE9 的浏览器；</p
  >
  <h2 id="editorconfig" tabindex="-1"
    ><a class="header-anchor" href="#editorconfig" aria-hidden="true">#</a> .editorconfig</h2
  >
  <p
    >该文件是一套用于统一代码格式的解决方案，可以帮助开发者在不同的编辑器和 IDE
    之间定义和维护一致的代码风格。常见的 IDE 如 WebStorm 都可以配置。可以参考
    <a
      href="http://www.alloyteam.com/2014/12/editor-config/"
      target="_blank"
      rel="noopener noreferrer"
      >editor-config<ExternalLinkIcon /></a
  ></p>
  <h2 id="escheckrc" tabindex="-1"
    ><a class="header-anchor" href="#escheckrc" aria-hidden="true">#</a> .escheckrc</h2
  >
  <p
    >使用简单的 shell 命令检查 JavaScript 文件中使用的 ES 版本。构建的前端包（dist 包）需要支持安卓
    5.0 及 iOS9.0 机型，所以为了避免包里出现 ES6 语法，增加了新的 npm scripts 命令: escheck。执行完
    npm run build 之后，可以使用 npm run escheck 进行检测。</p
  >
  <div class="language-json ext-json line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #D4D4D4">{</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">&quot;ecmaVersion&quot;</span><span style="color: #D4D4D4">: </span><span style="color: #CE9178">&quot;es5&quot;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">&quot;module&quot;</span><span style="color: #D4D4D4">: </span><span style="color: #569CD6">false</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">&quot;files&quot;</span><span style="color: #D4D4D4">: </span><span style="color: #CE9178">&quot;./dist/**/*.js&quot;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">&quot;not&quot;</span><span style="color: #D4D4D4">: []</span></span>
<span class="line"><span style="color: #D4D4D4">}</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span><br /><span
        class="line-number"
        >6</span
      ><br /></div></div
  ><h2 id="postcss-config-js" tabindex="-1"
    ><a class="header-anchor" href="#postcss-config-js" aria-hidden="true">#</a>
    postcss.config.js</h2
  >
  <p>postcss 配置文件，集成了 autoprefixer ，px2rem 等插件</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #4EC9B0">module</span><span style="color: #D4D4D4">.</span><span style="color: #4EC9B0">exports</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">plugins:</span><span style="color: #D4D4D4"> {</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #9CDCFE">autoprefixer:</span><span style="color: #D4D4D4"> {},</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #CE9178">&#39;postcss-pxtorem&#39;</span><span style="color: #9CDCFE">:</span><span style="color: #D4D4D4"> {</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">rootValue:</span><span style="color: #D4D4D4"> </span><span style="color: #B5CEA8">37.5</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">unitPrecision:</span><span style="color: #D4D4D4"> </span><span style="color: #B5CEA8">2</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">propList:</span><span style="color: #D4D4D4"> [</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;height&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;line-height&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;width&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;padding&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;margin&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;top&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;left&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;right&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;bottom&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #CE9178">&#39;font-size&#39;</span></span>
<span class="line"><span style="color: #D4D4D4">      ],</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">selectorBlackList:</span><span style="color: #D4D4D4"> [],</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">replace:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">true</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">mediaQuery:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">false</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">minPixelValue:</span><span style="color: #D4D4D4"> </span><span style="color: #B5CEA8">1</span></span>
<span class="line"><span style="color: #D4D4D4">    }</span></span>
<span class="line"><span style="color: #D4D4D4">  }</span></span>
<span class="line"><span style="color: #D4D4D4">};</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span><br /><span
        class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number">8</span><br /><span
        class="line-number"
        >9</span
      ><br /><span class="line-number">10</span><br /><span class="line-number">11</span><br /><span
        class="line-number"
        >12</span
      ><br /><span class="line-number">13</span><br /><span class="line-number">14</span><br /><span
        class="line-number"
        >15</span
      ><br /><span class="line-number">16</span><br /><span class="line-number">17</span><br /><span
        class="line-number"
        >18</span
      ><br /><span class="line-number">19</span><br /><span class="line-number">20</span><br /><span
        class="line-number"
        >21</span
      ><br /><span class="line-number">22</span><br /><span class="line-number">23</span><br /><span
        class="line-number"
        >24</span
      ><br /><span class="line-number">25</span><br /></div></div
  ><h2 id="prettier-config-js" tabindex="-1"
    ><a class="header-anchor" href="#prettier-config-js" aria-hidden="true">#</a>
    prettier.config.js</h2
  >
  <p>prettier 配置文件，用于代码格式化，如 .vue，.js，.ts，.css，.less 等文件</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #4EC9B0">module</span><span style="color: #D4D4D4">.</span><span style="color: #4EC9B0">exports</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 行尾需要有分号</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">semi:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">true</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 不使用缩进符，而使用空格</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">useTabs:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">false</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 使用 2 个空格缩进</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">tabWidth:</span><span style="color: #D4D4D4"> </span><span style="color: #B5CEA8">2</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 一行最多 120 字符</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">printWidth:</span><span style="color: #D4D4D4"> </span><span style="color: #B5CEA8">120</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 使用单引号</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">singleQuote:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">true</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 末尾无逗号</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">trailingComma:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;none&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 使用默认的折行标准</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">proseWrap:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;preserve&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 大括号内的首尾需要空格</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">bracketSameLine:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">true</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 箭头函数，只有一个参数的时候，也需要括号</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">arrowParens:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;always&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 对象的 key 仅在必要时用引号</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">quoteProps:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;as-needed&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// jsx 不使用单引号，而使用双引号</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">jsxSingleQuote:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">false</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// vue 文件中的 script 和 style 内需要缩进</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">vueIndentScriptAndStyle:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">true</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 根据显示样式决定 html 要不要折行</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">htmlWhitespaceSensitivity:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;css&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 不需要自动在文件开头插入 @prettier</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">insertPragma:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">false</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 不需要写文件开头的 @prettier</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">requirePragma:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">false</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 换行符使用 lf</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">endOfLine:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;lf&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 每个文件格式化的范围是文件的全部内容</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">rangeStart:</span><span style="color: #D4D4D4"> </span><span style="color: #B5CEA8">0</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">rangeEnd:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">Infinity</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 格式化内嵌代码</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">embeddedLanguageFormatting:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;auto&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">overrides:</span><span style="color: #D4D4D4"> [</span></span>
<span class="line"><span style="color: #D4D4D4">    {</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">files:</span><span style="color: #D4D4D4"> [</span><span style="color: #CE9178">&#39;*.less&#39;</span><span style="color: #D4D4D4">, </span><span style="color: #CE9178">&#39;*.css&#39;</span><span style="color: #D4D4D4">],</span></span>
<span class="line"><span style="color: #D4D4D4">      </span><span style="color: #9CDCFE">options:</span><span style="color: #D4D4D4"> {</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #9CDCFE">singleQuote:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">false</span></span>
<span class="line"><span style="color: #D4D4D4">      }</span></span>
<span class="line"><span style="color: #D4D4D4">    }</span></span>
<span class="line"><span style="color: #D4D4D4">  ]</span></span>
<span class="line"><span style="color: #D4D4D4">};</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span><br /><span
        class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /><span class="line-number">8</span><br /><span
        class="line-number"
        >9</span
      ><br /><span class="line-number">10</span><br /><span class="line-number">11</span><br /><span
        class="line-number"
        >12</span
      ><br /><span class="line-number">13</span><br /><span class="line-number">14</span><br /><span
        class="line-number"
        >15</span
      ><br /><span class="line-number">16</span><br /><span class="line-number">17</span><br /><span
        class="line-number"
        >18</span
      ><br /><span class="line-number">19</span><br /><span class="line-number">20</span><br /><span
        class="line-number"
        >21</span
      ><br /><span class="line-number">22</span><br /><span class="line-number">23</span><br /><span
        class="line-number"
        >24</span
      ><br /><span class="line-number">25</span><br /><span class="line-number">26</span><br /><span
        class="line-number"
        >27</span
      ><br /><span class="line-number">28</span><br /><span class="line-number">29</span><br /><span
        class="line-number"
        >30</span
      ><br /><span class="line-number">31</span><br /><span class="line-number">32</span><br /><span
        class="line-number"
        >33</span
      ><br /><span class="line-number">34</span><br /><span class="line-number">35</span><br /><span
        class="line-number"
        >36</span
      ><br /><span class="line-number">37</span><br /><span class="line-number">38</span><br /><span
        class="line-number"
        >39</span
      ><br /><span class="line-number">40</span><br /><span class="line-number">41</span><br /><span
        class="line-number"
        >42</span
      ><br /><span class="line-number">43</span><br /><span class="line-number">44</span><br /><span
        class="line-number"
        >45</span
      ><br /><span class="line-number">46</span><br /><span class="line-number">47</span
      ><br /></div></div
  ><p>检测命令：</p>
  <div class="language-bash ext-sh line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #D4D4D4">prettier --write </span><span style="color: #D7BA7D">\&quot;</span><span style="color: #D4D4D4">src/**/*.{js,jsx,json,ts,tsx,css,less,scss,vue,html,md}</span><span style="color: #D7BA7D">\&quot;</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /></div></div
  ><h2 id="stylelint-config-js" tabindex="-1"
    ><a class="header-anchor" href="#stylelint-config-js" aria-hidden="true">#</a>
    stylelint.config.js</h2
  >
  <p>样式编码规范的配置文件，用于检测 .less，.css 等样式文件</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #4EC9B0">module</span><span style="color: #D4D4D4">.</span><span style="color: #4EC9B0">exports</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">extends:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;@winner-fed/stylelint-config-win&#39;</span></span>
<span class="line"><span style="color: #D4D4D4">};</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /></div></div
  ><h2 id="eslintrc-js" tabindex="-1"
    ><a class="header-anchor" href="#eslintrc-js" aria-hidden="true">#</a> .eslintrc.js</h2
  >
  <p>JavaScript 编码规范，用于检测 .vue，.js，.ts 等文件</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #4EC9B0">module</span><span style="color: #D4D4D4">.</span><span style="color: #4EC9B0">exports</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">extends:</span><span style="color: #D4D4D4"> [</span><span style="color: #CE9178">&#39;@winner-fed/win&#39;</span><span style="color: #D4D4D4">, </span><span style="color: #CE9178">&#39;@winner-fed/win/vue&#39;</span><span style="color: #D4D4D4">]</span></span>
<span class="line"><span style="color: #D4D4D4">};</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /></div></div
  ><h2 id="f2elint-config-js" tabindex="-1"
    ><a class="header-anchor" href="#f2elint-config-js" aria-hidden="true">#</a>
    f2elint.config.js</h2
  >
  <p
    ><a
      href="https://www.npmjs.com/package/@winner-fed/f2elint"
      target="_blank"
      rel="noopener noreferrer"
      >F2ELint<ExternalLinkIcon
    /></a>
    是《恒生前端规约》的配套 Lint
    工具，可以为项目一键接入规约、一键扫描和修复规约问题，保障项目的编码规范和代码质量。</p
  >
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #D4D4D4"> </span><span style="color: #4EC9B0">module</span><span style="color: #D4D4D4">.</span><span style="color: #4EC9B0">exports</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">enableStylelint:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">true</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">enableMarkdownlint:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">true</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">enablePrettier:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">true</span></span>
<span class="line"><span style="color: #D4D4D4">};</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span
      ><br /></div></div
  ><h2 id="markdownlint-json" tabindex="-1"
    ><a class="header-anchor" href="#markdownlint-json" aria-hidden="true">#</a>
    .markdownlint.json</h2
  >
  <p
    >配套的 markdownlint 可共享配置。可参考
    <a
      href="https://www.npmjs.com/package/@winner-fed/markdownlint-config-win"
      target="_blank"
      rel="noopener noreferrer"
      >@winner-fed/markdownlint-config-win<ExternalLinkIcon /></a
  ></p>
  <div class="language-json ext-json line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #D4D4D4"> {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">&quot;extends&quot;</span><span style="color: #D4D4D4">: </span><span style="color: #CE9178">&quot;@winner-fed/markdownlint-config-win&quot;</span></span>
<span class="line"><span style="color: #D4D4D4">}</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /></div></div
  ><h2 id="commitlint-config-js" tabindex="-1"
    ><a class="header-anchor" href="#commitlint-config-js" aria-hidden="true">#</a>
    commitlint.config.js</h2
  >
  <p
    >commitlint 配置文件，用于对 git commit message 进行校验。继承
    <a
      href="https://www.npmjs.com/package/@winner-fed/commitlint-config-win"
      target="_blank"
      rel="noopener noreferrer"
      >@winner-fed/commitlint-config-win<ExternalLinkIcon /></a
  ></p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #D4D4D4"> </span><span style="color: #4EC9B0">module</span><span style="color: #D4D4D4">.</span><span style="color: #4EC9B0">exports</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">extends:</span><span style="color: #D4D4D4"> [</span><span style="color: #CE9178">&#39;@winner-fed/commitlint-config-win&#39;</span><span style="color: #D4D4D4">]</span></span>
<span class="line"><span style="color: #D4D4D4">};</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /></div></div
></template>
