const {createProxyMiddleware} = require('http-proxy-middleware');
const {BACK_BASE_URL} = require("./global_variables");

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // 👇️ make sure to update your target
            target: BACK_BASE_URL,
            changeOrigin: true,
        }),
    );
};