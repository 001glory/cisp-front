'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
       // 代理名称 可通过该代理名称来使用代理
  	  '/api': {
  	  	// API服务所在IP及端口号
        target:'https://www.judgchen.cn/cisp/',
        // target:'http://localhost:81/cisp//',
        changeOrigin: true, //跨域
        pathRewrite: {
          '^/api': '/' 
        }
  	  	// // 如果是https接口，需要配置这个参数
  	  	// secure: false,
  	  	// // 如果需要跨域，需要配置这个参数
  	  	// // 如果设置为true,那么本地会虚拟一个服务器接收你的请求并代你发送该请求，这样就不会有跨域问题（只适合开发环境）
  	  	// changeOrigin: true,
  	  	// // 重写路径
  	  	// // '^/api': '/api'  这种接口配置出来   http://XX.XX.XX.XX:8083/api/login
  	  	// // '^/api': '/'    这种接口配置出来     http://XX.XX.XX.XX:8083/login
  	  	// pathRewrite: {
        //   '^/api': 'http://localhost:8080/api/user/login'
        // }
  	  }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 3337, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'dist',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
