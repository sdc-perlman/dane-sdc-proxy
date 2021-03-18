import axios from 'axios';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReviewsService from '../../components/ReviewsContainer';

class SSR {
    constructor(baseUrl, html) {
        this.baseUrl = baseUrl;
        this.html = html;
        this.reviewsData = null;
    }

    getId() {
        const splitUrl = this.baseUrl.split('/');
        return splitUrl[splitUrl.length - 1];
    }

    async getReviewsData() {
        const { data } = await axios.get(`${process.env.REVIEWS_DOMAIN}/api/reviews/all/${this.getId()}`);
        this.reviewsData = data;
    }

    async renderReact() {
        await this.getReviewsData();

        return ReactDOMServer.renderToString(
            <ReviewsService
                exists={true}
                reviewInfo={this.reviewsData.reviewInfo}
                reviewsList={this.reviewsData.reviews}
            />,
        );
    }

    async getHtml() {
        const reactHtml = await this.renderReact();
        const addReviews = this.html.replace('<div id="reviews"></div>', `<div id="reviews">${reactHtml}</div>`);

        return addReviews.replace(
            '<script defer="defer" id="global"></script>',
            `<script defer="defer" id="global">window.__initialData__ = ${JSON.stringify(this.reviewsData)}</script>`,
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
