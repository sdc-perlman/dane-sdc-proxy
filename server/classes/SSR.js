import axios from 'axios';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReviewsService from '../../client/reviews/src/components/ReviewsContainer';
import NearbyService from '../../client/nearby/src/components/WorkspaceContainer';

class SSR {
    constructor(baseUrl, html) {
        this.baseUrl = baseUrl;
        this.html = html;
        this.data = {
            reviews: [],
            reviewInfo: {},
            nearbyWorkspaces: [],
            nearbyTransitOptions: {},
            photos: {},
        };
        this.urls = [
            process.env.REVIEWS_DOMAIN,
            process.env.NEARBY_DOMAIN,
            process.env.LOCATION_DOMAIN,
            process.env.PHOTOS_DOMAIN,
        ];
    }

    getId() {
        const splitUrl = this.baseUrl.split('/');
        return splitUrl[splitUrl.length - 1];
    }

    async getData() {
        const promises = this.urls.map((url) => axios.get(url + this.getId()));
        const responses = await Promise.all(promises);

        this.data.reviews = responses[0].data.reviews;
        this.data.reviewInfo = responses[0].data.reviewInfo;
        this.data.nearbyWorkspaces = responses[1].data.nearbyWorkspaces;
        this.data.nearbyTransitOptions = responses[2].data.nearbyTransitOptions;
        this.data.photos = responses[3].data;
    }

    async renderReact() {
        await this.getData();

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
            `<script defer="defer" id="global">window.initialData = ${JSON.stringify(this.data)}</script>`,
        );
    }
}

export default SSR;
