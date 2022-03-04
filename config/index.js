'use strict'
const path = require('path')
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://121.89.245.28:8081/',  //需要代理的地址  
        // target: 'http://127.0.0.1:3000/',  //需要代理的地址  
        changeOrigin: true,  //是否跨域  
        secure: false,
        pathRewrite: {  
          '^/api': '/'
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    // host: '192.168.1.35', // can be overwritten by process.env.HOST
    // host: '121.89.245.28', // can be overwritten by process.env.HOST
    port: 8096, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

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
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

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








// apps:
//   - script: ./start.js
//     name: 'app'
//     env:
//       COMMON_VARIABLE: true
//     env_production:
//       NODE_ENV: production

// deploy:
//   production:
//     user: lentoo
//     host: 192.168.2.166
//     port: 22
//     ref: origin/master
//     ssh_options: StrictHostKeyChecking=no
//     repo: https://github.com/**.git
//     path: /home
//     pre-deploy: git fetch --all
//     post-deploy: npm install &&  pm2 reload deploy.yaml --env production
//     env:
//       NODE_ENV: production