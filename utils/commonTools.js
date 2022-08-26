/**
 * 转换字符串（中划线转换为小驼峰）
 * @param str
 * @returns {*}
 */
export function parseStr(str) {
  return str.replace(/-(\w)/g, function ($0, $1) {
    return $1.toUpperCase();
  });
}

/**
 * 生成一个用不重复的ID
 */
export function getUUID() {
  return Number(Math.random().toString().substr(2)).toString(36);
}

export function generateOnlyContainer(str) {
  return `${parseStr(str)}${getUUID()}`;
}
