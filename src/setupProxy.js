const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use('/api', proxy({
    target: 'http://api-cn.ronghub.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '/user' },
  }));
  app.use('/anytalkrobot', proxy({
    target: 'http://www.shunong.shop',
    changeOrigin: true,
    pathRewrite: { '^/anytalkrobot': '/anytalkrobot' },
  }))
};