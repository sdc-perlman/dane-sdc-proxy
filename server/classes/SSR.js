import axios from 'axios';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReviewsService from '../../client/src/components/ReviewsContainer';

class SSR {
    constructor(baseUrl, html) {
        this.baseUrl = baseUrl;
        this.html = html;
        this.data = null;
    }

    getId() {
        const splitUrl = this.baseUrl.split('/');
        return splitUrl[splitUrl.length - 1];
    }

    async getReviewsData() {
        const { data } = await axios.get(`http://go:6003/api/${this.getId()}`);
        this.data = data;
    }

    async renderReact() {
        await this.getReviewsData();

        return ReactDOMServer.renderToString(
            <ReviewsService reviewInfo={this.data.reviewInfo} reviewsList={this.data.reviews} />,
        );
    }

    async getHtml() {
        const reactHtml = await this.renderReact();
        const addReviews = this.html.replace('<div id="reviews"></div>', `<div id="reviews">${reactHtml}</div>`);

        return addReviews.replace(
            '<script defer="defer" id="global"></script>',
            `<script defer="defer" id="global">window.__initialData__ = ${JSON.stringify(this.data)}</script>`,
        );
    }

    static getHtmlWithNoData(html) {
        return html.replace(
            '<script defer="defer" id="global"></script>',
            `<script defer="defer" id="global">window.__initialData__ = ${JSON.stringify({
                reviews: [],
                reviewInfo: { reviewCount: 0, avg: null },
            })} </script>`,
        );
    }
}

export default SSR;
