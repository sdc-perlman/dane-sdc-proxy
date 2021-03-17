/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReviewsList from './ReviewsList.jsx';
import Title from './Title.jsx';
import Stats from './Stats.jsx';
import { getReviewInfo, getWorkspaceId } from '../actions/index.js';

const ReviewsContainer = ({ exists = null, reviewsList = null, reviewInfo = null }) => {
    const [recordExists, setExists] = useState(exists);

    if (recordExists === null) {
        getReviewInfo(getWorkspaceId())
            .then(({ data }) => {
                if (data.success === false) {
                    setExists(false);
                } else {
                    setExists(true);
                }
            })
            .catch(() => setExists(false));
    }

    if (recordExists === null || recordExists === false) {
        return <></>;
    }

    return (
        <div className="reviews-section-container">
            <Title />
            <Stats reviewInfo={reviewInfo} />
            <ReviewsList reviewsList={reviewsList} />
        </div>
    );
};

export default ReviewsContainer;
