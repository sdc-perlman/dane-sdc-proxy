import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NearbyService from './components/NeabyService';

ReactDOM.hydrate(<NearbyService />, document.getElementById('nearby'));
