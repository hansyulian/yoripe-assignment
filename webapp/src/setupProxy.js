const { createProxyMiddleware } = require('http-proxy-middleware');
console.log('proxy endpoint:', process.env.REACT_APP_API_PROXY);
module.exports = function (app) {
  app.use('/api', createProxyMiddleware({
    target: process.env.REACT_APP_API_PROXY,
    changeOrigin: true,
    pathRewrite: { "/api": "" },
  }))
};