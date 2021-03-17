import React from 'react';
import ReviewsContainer from './ReviewsContainer.jsx';
const ReviewsService = () => (
    <ReviewsContainer reviewInfo={window.__initialData__.reviewInfo} reviewsList={window.__initialData__.reviews} />
);

export default ReviewsService;
