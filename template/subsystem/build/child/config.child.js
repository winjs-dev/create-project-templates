const base = require('./webpack.child.conf');
const { merge } = require('webpack-merge');
const { childName } = require('./utils');

const builds = {
  prod: {
    filename: `${childName}.js`,
    library: {
      type: 'umd'
    },
    env: 'production'
  }
};

function genConfig(opts) {
  return merge({}, base, {
    output: {
      filename: opts.filename,
      library: opts.library
    }
  });
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET]);
} else {
  exports.getBuild = (name) => genConfig(builds[name]);
  exports.getAllBuilds = () => Object.keys(builds).map((name) => genConfig(builds[name]));
}
