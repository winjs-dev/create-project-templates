import ejs from 'ejs';
import { microFrontTypeEnum } from './dictionary';

const indexHTML = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="renderer" content="webkit" />
    <meta
      name="viewport"
      content="width=device-width, viewport-fit=cover, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
    />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta content="telephone=no" name="format-detection" />
    <meta content="email=no" name="format-detection" />
    <%_ if (buildTools === 'bundless') { _%>
    <title><%%- title %%></title>
    <%_ } else { _%>
    <title><%= packageName %></title>
    <%_ } _%>
    <%_ if(!microFrontType.length) { _%>
    <style>
      html,
      body,
      #<%= appContainerName %> {
        height: 100%;
      }
    </style>
    <%_ } _%>
  </head>
  <body>
    <noscript>
      <strong>很抱歉，如果没有启用JavaScript，此项目将无法正常运行。请启用它。</strong>
    </noscript>
    <div id="<%= appContainerName %>">
      <style>
       #<%= appContainerName %> .app-loading {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

       #<%= appContainerName %> .app-loading .app-loading-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          display: flex;
          -webkit-transform: translate3d(-50%, -50%, 0);
          transform: translate3d(-50%, -50%, 0);
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

       #<%= appContainerName %> .dot {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 48px;
          margin-top: 30px;
          font-size: 32px;
          transform: rotate(45deg);
          box-sizing: border-box;
          animation: antRotate 1.2s infinite linear;
        }

       #<%= appContainerName %> .dot i {
          position: absolute;
          display: block;
          width: 20px;
          height: 20px;
          background-color: #3cefff;
          border-radius: 100%;
          opacity: 0.3;
          transform: scale(0.75);
          animation: antSpinMove 1s infinite linear alternate;
          transform-origin: 50% 50%;
        }

       #<%= appContainerName %> .dot i:nth-child(1) {
          top: 0;
          left: 0;
        }

       #<%= appContainerName %> .dot i:nth-child(2) {
          top: 0;
          right: 0;
          -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
        }

       #<%= appContainerName %> .dot i:nth-child(3) {
          right: 0;
          bottom: 0;
          -webkit-animation-delay: 0.8s;
          animation-delay: 0.8s;
        }

       #<%= appContainerName %> .dot i:nth-child(4) {
          bottom: 0;
          left: 0;
          -webkit-animation-delay: 1.2s;
          animation-delay: 1.2s;
        }

        @keyframes antRotate {
          to {
            -webkit-transform: rotate(405deg);
            transform: rotate(405deg);
          }
        }

        @-webkit-keyframes antRotate {
          to {
            -webkit-transform: rotate(405deg);
            transform: rotate(405deg);
          }
        }

        @keyframes antSpinMove {
          to {
            opacity: 1;
          }
        }

        @-webkit-keyframes antSpinMove {
          to {
            opacity: 1;
          }
        }
      </style>
      <div class="app-loading">
        <div class="app-loading-wrap">
          <div class="app-loading-dots">
            <span class="dot dot-spin"><i></i><i></i><i></i><i></i></span>
          </div>
        </div>
      </div>
    </div>
    <%_ if (mobileDevPlatform === 'gmu') { _%>
    <script>
      // 在页面初始化的时候，一旦优先调用了 LightSDK 的方法，会触发 deviceready 事件，而这个事件只会执行一遍，会导致 new Vue({...}) 不会执行，在壳子里就会出现白屏现象
      // __LIGHT__IS_READY 在 main.js 文件里的 nativeReady() 也有使用
      document.addEventListener('deviceready', function () {
        window.__LIGHT__IS_READY = true;
      });
    </script>
    <%_ } _%>
    <%_ if (needsQiankunMicroFrontend) { _%>
    <script src="<%%= BASE_URL %%>config.local.js"></script>
    <%_ } else { _%>
    <script>
      document.write(
        unescape(
          "%3Cscript src='<%%= BASE_URL %>config.local.js?_t=" +
            Math.random() +
            "' type='text/javascript'%3E%3C/script%3E"
        )
      );
    </script>
    <%_ } _%>
    <%_ if (buildTools === 'bundless' && application !== 'pc') { _%>
    <%%- injectScript %%>
    <%_ } _%>
    <script>
      Object.freeze(window.LOCAL_CONFIG);
      Object.defineProperty(window, 'LOCAL_CONFIG', {
        configurable: false,
        writable: false
      });
    </script>
  </body>
</html>
`;

export default function generateIndexHTML({
  packageName,
  application,
  microFrontType,
  mobileDevPlatform,
  appContainerName,
  buildTools
}) {
  const needsQiankunMicroFrontend = microFrontType?.includes(microFrontTypeEnum.qiankun);

  return ejs.render(indexHTML, {
    packageName,
    application,
    needsQiankunMicroFrontend,
    microFrontType,
    mobileDevPlatform,
    appContainerName,
    buildTools
  });
}
