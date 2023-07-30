const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  let proxyHost;
  if (Boolean(process.env.REACT_APP_PROXY_HOST)) {
      proxyHost = process.env.REACT_APP_PROXY_HOST;
  } else {
      proxyHost = "http://localhost:8080/"
  }
  app.use(
    '/api/*', // You can pass in an array too eg. ['/api', '/another/path']
    createProxyMiddleware({
      target: proxyHost,
      changeOrigin: true,
    })
  );
};
