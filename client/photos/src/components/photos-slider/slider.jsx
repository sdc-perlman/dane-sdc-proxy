/* eslint-disable react/prop-types */
import React from 'react';
import GlobalStyles from '../globalStyles.jsx';
import { useParams } from 'react-router-dom';
import { Slider, Slides } from './styles';
import SlideNav from './SlideNav';
import SlideNext from './SlideNext';
import SlidesTrack from './SlidesTrack';

const PhotosSlider = (props) => {
    const { workspaceId } = useParams();
    const [photos, setPhotos] = React.useState(props.photos || []);
    const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);

    const handleNextSlide = () => {
        if (activeSlideIndex < photos.length - 1) {
            setActiveSlideIndex(activeSlideIndex + 1);
        } else {
            setActiveSlideIndex(0);
        }
    };

    const handleSetSlide = (i) => {
        setActiveSlideIndex(i);
    };

    React.useEffect(() => {
        if (!props) {
            fetch(`/api/photos/workspace/${workspaceId}`)
                .then((res) => res.json())
                .then((data) => {
                    setPhotos(data);
                });
        }
    }, []);

    return (
        <Slider>
            <GlobalStyles />
            <Slides>
                <SlidesTrack photos={photos} activeSlide={activeSlideIndex} />
                <SlideNext handleClick={handleNextSlide} />
            </Slides>
            <SlideNav photos={photos} activeSlide={activeSlideIndex} handleSetSlide={handleSetSlide} />
        </Slider>
    );
};

export default PhotosSlider;
