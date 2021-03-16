import express from 'express';
import fs from 'fs';
import path from 'path';
import reviewsAllRoutes from './routes/reviewsAll';
import reviewCalculationRoutes from './routes/reviewCalculationRoutes';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReviewService from '../client/src/components/ReviewsContainer';
import axios from 'axios';

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.use('/buildings/:space', (req, res) => {
	fs.readFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'), 'utf8', async (err, data) => {
		if (err) throw err;

		const split = req.baseUrl.split('/');
		const id = split[split.length - 1];

		const resInfo = await axios.get(`http://localhost:5002/api/reviews/info/${id}`);
		const resAll = await axios.get(`http://localhost:5002/api/reviews/all/${id}`)

		console.log(resAll.data);

		console.log('ID', split[split.length - 1])

		const html = ReactDOMServer.renderToString(<ReviewService exists={true} reviewInfo={resInfo.data} reviewsList={resAll.data.reviews}/>);

		console.log(html)

		return res.send(data.replace('<div id="reviews"></div>', `<div id="reviews">${html}</div>`));
	});
})




app.use(...reviewsAllRoutes);
app.use(...reviewCalculationRoutes);

const port = process.env.PORT || 6002;

app.listen(port, () => console.log(`listening on port ${port}`));
