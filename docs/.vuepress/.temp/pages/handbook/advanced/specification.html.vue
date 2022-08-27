<template
  ><h1 id="规范" tabindex="-1"
    ><a class="header-anchor" href="#规范" aria-hidden="true">#</a> 规范</h1
  >
  <p>写程序的时候，首先考虑到人，其次才考虑机器。 —— 出自《代码大全》</p>
  <h2 id="eslint" tabindex="-1"
    ><a class="header-anchor" href="#eslint" aria-hidden="true">#</a> ESLint</h2
  >
  <p
    >代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。当我们设计了一套有关编码规范的规则集时，就需要借助工具来辅助检测。这就是
    ESLint。它是一个集代码审查和修复的工具，它的核心功能是通过配置一个个规则来限制代码的合法性和风格。目前是社区内最流行、通用的JS
    Lint工具。ESLint 会默认读取配置文件 .eslintrc.* 文件，统一的规则集在 rules 中进行配置。</p
  >
  <h3 id="配置解析器和解析参数" tabindex="-1"
    ><a class="header-anchor" href="#配置解析器和解析参数" aria-hidden="true">#</a>
    配置解析器和解析参数</h3
  >
  <p>ESLint 默认使用 Espree 作为其解析器，也可以在配置文件中指定一个不同的解析器，比如</p>
  <ul>
    <li>
      <p
        >@babel/eslint-parser - 一个对 Babel 解析器的包装，提供对一些 babel 语法的支持，使其能够与
        ESLint 兼容。如果项目中使用了较新的 ES 语法，比如 ES2020中的 Optional
        Chaining（可选链操作符），可以指定其作为解析器。</p
      >
    </li>
    <li>
      <p
        >@typescript-eslint/parser - 将 TypeScript 转换成与 estree 兼容的形式，以便在 ESLint
        中使用。如果项目是使用 TS 开发的，优先使用此作为解析器。</p
      >
    </li>
  </ul>
  <p>解析器选项可以在 .eslintrc.* 文件使用 parserOptions 属性设置。示例如下：</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #D4D4D4"> </span><span style="color: #4EC9B0">module</span><span style="color: #D4D4D4">.</span><span style="color: #4EC9B0">exports</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #6A9955">// ESLint 默认解析器，也可以指定成别的</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #9CDCFE">parser:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&quot;espree&quot;</span><span style="color: #D4D4D4">, </span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #9CDCFE">parserOption:</span><span style="color: #D4D4D4"> {</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #6A9955">// 指定要使用的 ECMAScript 版本，默认值 5</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #6A9955">// 可以使用 6、7、8、9 或 10 来指定想要使用的 ECMAScript 版本。也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)，或 2020（同 11） 或 2021（同 12）</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #9CDCFE">ecmaVersion:</span><span style="color: #D4D4D4"> </span><span style="color: #B5CEA8">5</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #6A9955">// 设置为 script (默认) 或 module（如果项目中的代码是 ECMAScript 模块)</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #9CDCFE">sourceType:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&quot;script&quot;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #6A9955">// 这是个对象，表示想使用的额外的语言特性，所有选项默认都是 false</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #9CDCFE">ecmafeatures:</span><span style="color: #D4D4D4"> {</span></span>
<span class="line"><span style="color: #D4D4D4">            </span><span style="color: #6A9955">// 是否允许在全局作用域下使用 return 语句</span></span>
<span class="line"><span style="color: #D4D4D4">            </span><span style="color: #9CDCFE">globalReturn:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">false</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">            </span><span style="color: #6A9955">// 是否启用全局 strict 模式（严格模式）</span></span>
<span class="line"><span style="color: #D4D4D4">            </span><span style="color: #9CDCFE">impliedStrict:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">false</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">            </span><span style="color: #6A9955">// 是否启用JSX</span></span>
<span class="line"><span style="color: #D4D4D4">            </span><span style="color: #9CDCFE">jsx:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">false</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">            </span><span style="color: #6A9955">// 是否启用对实验性的 object rest/spread properties 的支持</span></span>
<span class="line"><span style="color: #D4D4D4">            </span><span style="color: #9CDCFE">experimentalObjectRestSpread:</span><span style="color: #D4D4D4"> </span><span style="color: #569CD6">false</span></span>
<span class="line"><span style="color: #D4D4D4">        }</span></span>
<span class="line"><span style="color: #D4D4D4">    }</span></span>
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
      ><br /><span class="line-number">22</span><br /></div></div
  ><p>举个例子，使用 Vue 作为技术框架，创建的项目中使用的 ESLint 的配置文件</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #4EC9B0">module</span><span style="color: #D4D4D4">.</span><span style="color: #4EC9B0">exports</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #6A9955">// 需要指定可以可以解析 .vue 语法的解析器</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">parser:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;vue-eslint-parser&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">parserOptions:</span><span style="color: #D4D4D4"> {</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #9CDCFE">parser:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;@babel/eslint-parser&#39;</span></span>
<span class="line"><span style="color: #D4D4D4">  }</span></span>
<span class="line"><span style="color: #D4D4D4">}</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span><br /><span
        class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br /></div></div
  ><p
    >目前，团队采用
    <a
      href="https://github.com/cloud-templates/eslint-config-win"
      target="_blank"
      rel="noopener noreferrer"
      >eslint-config-win<ExternalLinkIcon
    /></a>
    来检验 JavaScript/Vue 的代码，具体规则可以参考这个<a
      href="http://fulldev.winner123.cn/h5-linter-docs/?rule=base"
      target="_blank"
      rel="noopener noreferrer"
      >linter-docs/javascript<ExternalLinkIcon /></a
    >、
    <a
      href="http://fulldev.winner123.cn/h5-linter-docs/?rule=vue"
      target="_blank"
      rel="noopener noreferrer"
      >linter-docs/vue<ExternalLinkIcon /></a
    >。</p
  >
  <h2 id="stylelint" tabindex="-1"
    ><a class="header-anchor" href="#stylelint" aria-hidden="true">#</a> StyleLint</h2
  >
  <p
    >StyleLint 是一个强大的、现代化的 CSS 检测工具, 与 ESLint 类似,
    也是通过定义一系列的编码风格规则帮助我们避免在样式表中出现错误。支持最新的 CSS
    语法、CSS-in-JS、以及其他类 CSS 语法(如SCSS、Less)。</p
  >
  <h3 id="配置方式" tabindex="-1"
    ><a class="header-anchor" href="#配置方式" aria-hidden="true">#</a> 配置方式</h3
  >
  <p>按顺序查找，任何一项有值，就会结束查找：</p>
  <ul>
    <li>在 package.json 中的 stylelint 属性指定规则</li>
    <li
      >在 .stylelintrc 文件中指定，也是可以是 JSON 或者 YAML 文件格式。或者给该文件加后缀，如
      .stylelintrc.json , .stylelintrc.yaml , .stylelintrc.yml , .stylelintrc.js</li
    >
    <li>stylelint.config.js 文件，该文件 exports 一个配置对象</li>
  </ul>
  <h3 id="语法格式" tabindex="-1"
    ><a class="header-anchor" href="#语法格式" aria-hidden="true">#</a> 语法格式</h3
  >
  <p>rules 优先级大于 extends，建议采用 extends 或 plugins 方式统一管理</p>
  <div class="language-javascript ext-js line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #4EC9B0">module</span><span style="color: #D4D4D4">.</span><span style="color: #4EC9B0">exports</span><span style="color: #D4D4D4"> = {</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">processors:</span><span style="color: #D4D4D4"> [</span><span style="color: #CE9178">&#39;stylelint-my-processor&#39;</span><span style="color: #D4D4D4">],</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">plugins:</span><span style="color: #D4D4D4"> [</span><span style="color: #CE9178">&#39;stylelint-order&#39;</span><span style="color: #D4D4D4">, </span><span style="color: #CE9178">&quot;./mySpecialRule.js&quot;</span><span style="color: #D4D4D4">],</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">extends:</span><span style="color: #D4D4D4"> [</span><span style="color: #CE9178">&#39;stylelint-config-standard&#39;</span><span style="color: #D4D4D4">, </span><span style="color: #CE9178">&#39;./myExtendableConfig&#39;</span><span style="color: #D4D4D4">],</span></span>
<span class="line"><span style="color: #D4D4D4">  </span><span style="color: #9CDCFE">rules:</span><span style="color: #D4D4D4"> {</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #6A9955">// 要求或禁止使用空行 always-有必须有空行 never-之前不加空行</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #6A9955">// except 辅助选项</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #CE9178">&#39;at-rule-empty-line-before&#39;</span><span style="color: #9CDCFE">:</span><span style="color: #D4D4D4"> [</span><span style="color: #CE9178">&#39;always&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">      {</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #9CDCFE">except:</span><span style="color: #D4D4D4"> [</span></span>
<span class="line"><span style="color: #D4D4D4">          </span><span style="color: #CE9178">&#39;blockless-after-same-name-blockless&#39;</span><span style="color: #D4D4D4">, </span><span style="color: #6A9955">// 同名规则可不加空行</span></span>
<span class="line"><span style="color: #D4D4D4">          </span><span style="color: #CE9178">&#39;first-nested&#39;</span><span style="color: #D4D4D4"> </span><span style="color: #6A9955">// 第一个子节点不加空行</span></span>
<span class="line"><span style="color: #D4D4D4">        ],</span></span>
<span class="line"><span style="color: #D4D4D4">        </span><span style="color: #9CDCFE">ignore:</span><span style="color: #D4D4D4"> [</span><span style="color: #CE9178">&#39;after-comment&#39;</span><span style="color: #D4D4D4">] </span><span style="color: #6A9955">// 忽略注释后的规则</span></span>
<span class="line"><span style="color: #D4D4D4">      }</span></span>
<span class="line"><span style="color: #D4D4D4">    ],</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #6A9955">// 指定大小写</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #CE9178">&#39;at-rule-name-case&#39;</span><span style="color: #9CDCFE">:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;lower&#39;</span><span style="color: #D4D4D4">,</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #6A9955">// 要求在 at 规则之后有一个换行符 多行</span></span>
<span class="line"><span style="color: #D4D4D4">    </span><span style="color: #CE9178">&#39;at-rule-name-newline-after&#39;</span><span style="color: #9CDCFE">:</span><span style="color: #D4D4D4"> </span><span style="color: #CE9178">&#39;always-multi-line&#39;</span><span style="color: #D4D4D4">,</span></span>
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
      ><br /><span class="line-number">22</span><br /></div></div
  ><p
    >目前，团队采用
    <a
      href="https://github.com/cloud-templates/stylelint-config-win"
      target="_blank"
      rel="noopener noreferrer"
      >stylelint-config-win<ExternalLinkIcon
    /></a>
    来检验 CSS/Less 的代码，具体规则可以参考这个<a
      href="http://fulldev.winner123.cn/h5-linter-docs/?rule=style"
      target="_blank"
      rel="noopener noreferrer"
      >linter-docs/style<ExternalLinkIcon /></a
    >.。</p
  >
  <h2 id="commitlint" tabindex="-1"
    ><a class="header-anchor" href="#commitlint" aria-hidden="true">#</a> CommitLint</h2
  >
  <p
    >基于社区应用比较广泛的 Angular Commit message 写法规范 在实际项目开发过程中，Git
    的每次提交代码，都需要写 Commit message（提交说明），规范的 Commit message有很多好处：</p
  >
  <ul>
    <li>方便快速浏览查找，回溯之前的工作内容和当时处理问题的一些细节问题</li>
    <li>可以直接从 Commit 生成 Change log (发布时用于说明版本差异)</li>
  </ul>
  <h3 id="规范方式" tabindex="-1"
    ><a class="header-anchor" href="#规范方式" aria-hidden="true">#</a> 规范方式</h3
  >
  <p
    >可以借助
    <a href="https://marionebl.github.io/commitlint/#/" target="_blank" rel="noopener noreferrer"
      >commitlint<ExternalLinkIcon
    /></a>
    和
    <a href="https://github.com/typicode/husky" target="_blank" rel="noopener noreferrer"
      >husky<ExternalLinkIcon
    /></a>
    来进行提交检查，当执行 git commit 时会在对应的git钩子上做校验，只有符合格式的 Commit message
    才能提交成功。为了方便使用，增加了对
    <a href="https://github.com/commitizen/cz-cli" target="_blank" rel="noopener noreferrer"
      >commitizen<ExternalLinkIcon
    /></a>
    的支持，可以使用
    <a
      href="https://github.com/leonardoanalista/cz-customizable"
      target="_blank"
      rel="noopener noreferrer"
      >cz-customizable<ExternalLinkIcon
    /></a>
    进行配置。支持使用 git cz 替代 git commit。
    <strong
      >脚手架已经内置了此功能（项目初建时，版本管理工具选择 Git 即可），借助 husky 实现在Git
      提交前（pre-push）的钩子函数，增加 eslint 及 stylelint 的编码规范检测。</strong
    ></p
  >
  <h3 id="commit-message-规范格式" tabindex="-1"
    ><a class="header-anchor" href="#commit-message-规范格式" aria-hidden="true">#</a> Commit
    message 规范格式</h3
  >
  <p>此内容包含3个部分：Header（必选）、Body 和 Footer</p>
  <div class="language-text ext-text line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #D4D4D4">&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">// 空一行</span></span>
<span class="line"><span style="color: #D4D4D4">&lt;body&gt;</span></span>
<span class="line"><span style="color: #D4D4D4">// 空一行</span></span>
<span class="line"><span style="color: #D4D4D4">&lt;footer&gt;</span></span>
<span class="line"><span style="color: #D4D4D4"></span></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /><span class="line-number">4</span><br /><span class="line-number">5</span
      ><br /></div></div
  ><p>其中 Header 主要包含以下部分：</p>
  <p
    ><code>&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;</code> // 注意冒号 : 后有空格 // 如
    feat(miniprogram): 增加了小程序模板消息相关功能 复制代码</p
  >
  <ul>
    <li><strong>subject（必填）：</strong> 用于对commit进行简短的描述</li>
    <li
      ><strong>type（必填）：</strong> 表示提交类型，值有以下几种：
      <ul>
        <li>feat 增加新功能</li>
        <li>fix 修复问题/BUG</li>
        <li>style 代码风格相关无影响运行结果的</li>
        <li>perf 优化/性能提升</li>
        <li>refactor 重构</li>
        <li>revert 撤销修改</li>
        <li>test 测试相关</li>
        <li>docs 文档/注释</li>
        <li>chore 依赖更新/脚手架配置修改等</li>
        <li>workflow 工作流改进</li>
        <li>ci 持续集成</li>
        <li>types 类型定义文件更改</li>
        <li>wip 开发中</li>
      </ul>
    </li>
    <li
      ><strong>scope（选填）：</strong> 表示commit的作用范围，如数据层、视图层，也可以是目录名称</li
    >
  </ul>
  <h3 id="跳过规约检查" tabindex="-1"
    ><a class="header-anchor" href="#跳过规约检查" aria-hidden="true">#</a> 跳过规约检查</h3
  >
  <p>强烈不建议你这么做，但你执意如此：</p>
  <div class="language-bash ext-sh line-numbers-mode">
    <pre
      v-pre
      class="shiki"
      style="background-color: #1e1e1e"
    ><code><span class="line"><span style="color: #D4D4D4">git commit -m </span><span style="color: #CE9178">&quot;xxx&quot;</span><span style="color: #D4D4D4"> --no-verify</span></span>
<span class="line"><span style="color: #6A9955"># or</span></span>
<span class="line"><span style="color: #D4D4D4">git commit -m </span><span style="color: #CE9178">&quot;xxx&quot;</span><span style="color: #D4D4D4"> -n</span></span>
<span class="line"></span></code></pre
    ><div class="line-numbers" aria-hidden="true"
      ><span class="line-number">1</span><br /><span class="line-number">2</span><br /><span
        class="line-number"
        >3</span
      ><br /></div></div
  ><p
    >目前，团队采用
    <a
      href="https://www.npmjs.com/package/@winner-fed/commitlint-config-win"
      target="_blank"
      rel="noopener noreferrer"
      >@winner-fed/commitlint-config-win<ExternalLinkIcon
    /></a>
    来检验 git commit 的信息。配置文件可以参考工程模板根目录下的
    <code>commitlint.config.js</code>。</p
  >
  <h2 id="markdown" tabindex="-1"
    ><a class="header-anchor" href="#markdown" aria-hidden="true">#</a> Markdown</h2
  >
  <p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。</p>
  <p>使用它编写技术文档时，具备以下优势：</p>
  <ul>
    <li>
      <p
        >Markdown 处处可用。人们使用它来创建 网站、文档、便签、书籍、演示文稿、邮件 和 技术文档。</p
      >
    </li>
    <li>
      <p
        >Markdown 是可移植的。几乎可以使用任何应用程序打开包含 Markdown
        格式的文本文件。如果你不喜欢当前使用的 Markdown 应用程序了，则可以将 Markdown 文件导入另一个
        Markdown 应用程序中。这与 Microsoft Word 等文字处理应用程序形成了鲜明的对比，Microsoft Word
        将你的内容锁定在专有文件格式中。</p
      >
    </li>
    <li>
      <p>Markdown 是独立于平台的。你可以在运行任何操作系统的任何设备上创建 Markdown 格式的文本。</p>
    </li>
    <li>
      <p
        >Markdown
        能适应未来的变化。即使你正在使用的应用程序将来会在某个时候不能使用了，你仍然可以使用文本编辑器读取
        Markdown
        格式的文本。当涉及需要无限期保存的书籍、大学论文和其他里程碑式的文件时，这是一个重要的考虑因素。</p
      >
    </li>
    <li>
      <p
        >Markdown 无处不在。例如 Reddit 和 GitHub 等网站都支持 Markdown，许多桌面和基于 Web
        的应用程序也都支持 Markdown。</p
      >
    </li>
  </ul>
  <p><strong>因此，遵守行文规范，可以保证所有文章阅读体验的一致性。</strong></p>
  <p
    >目前，团队采用
    <a
      href="https://www.npmjs.com/package/@winner-fed/markdownlint-config-win"
      target="_blank"
      rel="noopener noreferrer"
      >@winner-fed/markdownlint-config-win<ExternalLinkIcon
    /></a>
    来检验 markdown 文档的格式问题。配置文件可以参考工程模板根目录下的
    <code>.markdownlint.json</code>。</p
  >
</template>
