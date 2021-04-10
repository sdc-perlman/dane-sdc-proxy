/* eslint-disable react/prop-types */
import React from 'react';
import Slide from './Slide';
import { SlidesTrackWrapper } from './styles.jsx';

const SlidesTrack = ({ photos, activeSlide }) => (
    <SlidesTrackWrapper activeSlide={activeSlide}>
        {photos.map((photo) => (
            <Slide key={photo.id} photo={photo} />
        ))}
    </SlidesTrackWrapper>
);

export default SlidesTrack;
