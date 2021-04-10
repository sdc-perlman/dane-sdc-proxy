/* eslint-disable react/prop-types */
import React from 'react';
import { ImageWrapper, Image, ImageCaption, SlideWrapper } from './styles.jsx';

const Slide = ({ photo }) => (
    <SlideWrapper>
        <ImageWrapper>
            <Image src={photo.url} alt={photo.description} />
        </ImageWrapper>
        <ImageCaption>{photo.description}</ImageCaption>
    </SlideWrapper>
);

export default Slide;
