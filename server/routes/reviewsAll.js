const { createProxyMiddleware } = require('http-proxy-middleware');
const reviewsCache = require('../cache/reviewsCache');
const client = require('../cache/client');

module.exports = [
    '/api/reviews/all/:space',
    reviewsCache,
    createProxyMiddleware({
        target: process.env.REVIEWS_DOMAIN,
        onProxyRes(proxyRes, req, _res) {
            proxyRes.on('data', (data) => {
                if (req.statusCode < 400) client.setex(`reviews${req.params.space}`, 3600, data.toString());
            });
        },
    }),
];
