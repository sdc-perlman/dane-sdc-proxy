import fs from 'fs';
import path from 'path';
import axios from 'axios';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReviewService from '../../services/reviewService/components/ReviewsContainer';

module.exports = [
    '/buildings/:space',
    (req, res) => {
        fs.readFile(path.resolve(__dirname, '../../public/index.html'), 'utf8', async (err, data) => {
            try {
                if (err) return res.status(500).json({ message: 'Internal server error' });

                const splitUrl = req.baseUrl.split('/');
                const id = splitUrl[splitUrl.length - 1];

                const resAll = await axios.get(`${process.env.REVIEWS_DOMAIN}/api/reviews/all/${id}`);
                const html = ReactDOMServer.renderToString(
                    <ReviewService
                        exists={true}
                        reviewInfo={resAll.data.reviewInfo}
                        reviewsList={resAll.data.reviews}
                    />,
                );

                const addReviews = data.replace('<div id="reviews"></div>', `<div id="reviews">${html}</div>`);
                const addData = addReviews.replace(
                    '<script id="global"></script>',
                    `<script id="global">window.__initialData__ = ${JSON.stringify(resAll.data)}</script>`,
                );

                return res.send(addData);
            } catch (error) {
                const noData = data.replace(
                    '<script id="global"></script>',
                    `<script id="global">window.__initialData__ = ${JSON.stringify({
                        reviews: [],
                        reviewInfo: { reviewCount: 0, avg: null },
                    })} </script>`,
                );

                return res.send(noData);
            }
        });
    },
];
