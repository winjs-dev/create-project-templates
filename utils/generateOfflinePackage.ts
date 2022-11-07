import ejs from 'ejs';

const offlinePackage = `
{
<%_ if (mobileDevPlatform === 'gmu') { _%>
  "//id": "离线包的 ID",
  "id": "<%= offlineId %>",

  "//name": "离线包的中文描述",
  "name": "<%= offlineName %>",
  <%_ } else { _%>
  "//id": "离线包的 ID",
  "id": "<%= mpaasOfflineId %>",

  "//name": "离线包的中文描述",
  "name": "<%= mpaasOfflineName %>",
  <%_ } _%>
  
  "//appVersion": "需要依赖的安卓或者IOS APP 版本，可以是具体的版本，如 6.0.0.0，也可以是一个区间，如 0.0.0.0~9.9.9.9",
  "appVersion": {
    "ios": "0.0.0.1",
    "android": "0.0.0.1"
  }
}
`;
export default function generateOfflinePackage({
  mobileDevPlatform,
  offlineId,
  offlineName,
  mpaasOfflineId,
  mpaasOfflineName
}) {
  return ejs.render(offlinePackage, {
    mobileDevPlatform,
    offlineId,
    offlineName,
    mpaasOfflineId,
    mpaasOfflineName
  });
}
