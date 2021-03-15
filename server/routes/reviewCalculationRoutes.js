const { createProxyMiddleware } = require('http-proxy-middleware');
const reviewCalculationsCache = require('../cache/reviewCalculataionsCache');
const client = require('../cache/client');

module.exports = [
    '/api/reviews/info/:space',
    reviewCalculationsCache,
    createProxyMiddleware({
        target: process.env.REVIEWS_DOMAIN,
        onProxyRes(proxyRes, req, _res) {
            proxyRes.on('data', (data) => {
                if (req.statusCode < 400) client.setex(`reviewCalculations${req.params.space}`, 3600, data.toString());
            });
        },
    }),
];
