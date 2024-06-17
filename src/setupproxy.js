const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.resend.com',
      changeOrigin: true,
      // Configura aquí los encabezados CORS según sea necesario
      onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'; // Agrega el dominio local
      },
    })
  );
};
