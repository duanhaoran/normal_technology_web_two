'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  devServer: {
    // 配置多个代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8060/DG',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
})
