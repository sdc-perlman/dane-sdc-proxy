/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ReviewsService from './components/ReviewService.jsx';

ReactDOM.hydrate(<ReviewsService />, document.getElementById('reviews'));
