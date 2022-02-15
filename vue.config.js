module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    port: 3012,
  },
  css: {
    // modules: false,
    extract: true,
    sourceMap: false,
  },
};
