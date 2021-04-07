/* eslint-disable react/prop-types */
import React from 'react';
import NearbyTransit from '../NearbyTransit';
import { faTrain, faBus, faBicycle, faRoad } from '@fortawesome/free-solid-svg-icons';
import { Wrapper, List } from './styles';

const NearbyTransitList = ({ nearbyTransits }) => {
    const types = {
        metro: faTrain,
        bus: faBus,
        'bike path': faBicycle,
        freeway: faRoad,
    };

    return (
        <>
            <Wrapper>
                <p className="transit-title">NEARBY TRANSIT</p>
            </Wrapper>
            <List>
                {nearbyTransits.map((option, i) => (
                    <NearbyTransit key={i} option={option} type={types[option.type]} />
                ))}
            </List>
        </>
    );
};

export default NearbyTransitList;
