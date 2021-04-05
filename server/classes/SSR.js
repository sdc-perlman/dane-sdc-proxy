import axios from 'axios';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReviewsService from '../../client/reviews/src/components/ReviewsContainer';
import NearbyService from '../../client/nearby/src/components/WorkspaceContainer';

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
        const { data } = await axios.get(`${process.env.GO_DOMAIN}/${this.getId()}`);
        console.log('DATA: ', data);
        this.data = data;
    }

    async renderReact() {
        await this.getReviewsData();
        const reviewsJSX = ReactDOMServer.renderToString(
            <ReviewsService reviewInfo={this.data.reviewInfo} reviewsList={this.data.reviews} />,
        );
        const nearbyJSX = ReactDOMServer.renderToString(
            <NearbyService nearbyWorkspaces={this.data.nearbyWorkspaces} />,
        );

        return { reviewsJSX, nearbyJSX };
    }

    async getHtml() {
        const html = await this.renderReact();
        const addReviews = this.html.replace('<div id="reviews"></div>', `<div id="reviews">${html.reviewsJSX}</div>`);
        const addNearby = addReviews.replace('<div id="nearby"></div>', `<div id="nearby">${html.nearbyJSX}</div>`);

        return addNearby.replace(
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
