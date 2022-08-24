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
