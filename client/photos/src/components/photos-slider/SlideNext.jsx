/* eslint-disable react/prop-types */
import React from 'react';
import { RightArrow, SlideButton } from './styles.jsx';

const SlideNext = ({ handleClick }) => (
    <SlideButton onClick={handleClick}>
        <RightArrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.99 6.99">
            <g data-name="Layer 2">
                <path
                    d="M11.85 6.85a.46.46 0 0 1-.67 0L6 1.2.81 6.85a.46.46 0 0 1-.67 0 .46.46 0 0 1 0-.67l5.47-6V.1A.5.5 0 0 1 6 0a.45.45 0 0 1 .35.14v.08l5.46 6a.46.46 0 0 1 .04.63z"
                    data-name="Layer 1"
                ></path>
            </g>
        </RightArrow>
    </SlideButton>
);

export default SlideNext;
