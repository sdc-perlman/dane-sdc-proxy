/* eslint-disable react/prop-types */
import React from 'react';
import ReviewsList from './ReviewsList.jsx';
import Title from './Title.jsx';
import Stats from './Stats.jsx';

const ReviewsContainer = ({ reviewsList, reviewInfo }) => (
    <div className="reviews-section-container">
        <Title />
        <Stats reviewInfo={reviewInfo} />
        <ReviewsList reviewsList={reviewsList} />
    </div>
);
export default ReviewsContainer;
