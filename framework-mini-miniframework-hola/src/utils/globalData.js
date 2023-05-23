const globalData = {};

if (IS_RN) {
  global.globalData = {};
}

const setGlobalData = (key, val) => {
  (IS_RN ? global.globalData : globalData)[key] = val;
};

const getGlobalData = (key) => {
  return (IS_RN ? global.globalData : globalData)[key];
};

export { setGlobalData, getGlobalData };
