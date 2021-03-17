import fs from 'fs';
import path from 'path';
import axios from 'axios';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReviewService from '../../client/src/components/ReviewsContainer';

module.exports = [
    '/buildings/:space',
    (req, res) => {
        fs.readFile(path.resolve(__dirname, '../../client/public/index.html'), 'utf8', async (err, data) => {
            if (err) return res.status(500).json({ message: 'Internal server error' });

            const splitUrl = req.baseUrl.split('/');
            const id = splitUrl[splitUrl.length - 1];

            const resInfo = await axios.get(`${process.env.REVIEWS_DOMAIN}/api/reviews/info/${id}`);
            const resAll = await axios.get(`${process.env.REVIEWS_DOMAIN}/api/reviews/all/${id}`);

            const html = ReactDOMServer.renderToString(
                <ReviewService exists={true} reviewInfo={resInfo.data} reviewsList={resAll.data.reviews} />,
            );

            return res.send(data.replace('<div id="reviews"></div>', `<div id="reviews">${html}</div>`));
        });
    },
];
