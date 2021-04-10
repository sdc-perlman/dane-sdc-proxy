import React from 'react';
import PhotosSlider from './photos-slider/slider';

const PhotosService = () =>
    window.initialData ? <PhotosSlider photos={window.initialData.photos} /> : <PhotosSlider />;

export default PhotosService;
