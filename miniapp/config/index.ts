const config = {
  projectName: 'cycle-tracker',
  date: '2026-7-1',
  designWidth: 390,
  deviceRatio: { 640: 1.17, 750: 1, 828: 0.905, 390: 2 },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-platform-weapp', '@tarojs/plugin-framework-react'],
  defineConstants: {},
  copy: { patterns: [], options: {} },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false },
  },
  mini: {},
  h5: { publicPath: '/' },
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
