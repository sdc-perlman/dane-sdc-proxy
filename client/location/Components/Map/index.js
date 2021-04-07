/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Wrapper } from './styles';

const Map = ({ locationData }) => {
    const { origin, nearbyWorkspaces } = locationData;
    const coordinates = origin.geometry.coordinates;

    useEffect(() => {
        mapboxgl.accessToken = process.env.KEY;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: coordinates,
            zoom: 11,
        });

        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .addTo(map)
            .setLngLat(coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
                    '<h3>' + origin.streetNumber + ' ' + origin.streetName + '</h3>',
                ),
            )
            .addTo(map);

        if (nearbyWorkspaces) {
            nearbyWorkspaces.forEach((workspace) => {
                const el = document.createElement('div');
                el.className = 'marker nearby';

                new mapboxgl.Marker(el)
                    .setLngLat(workspace.geometry.coordinates)
                    .addTo(map)
                    .setLngLat(workspace.geometry.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
                            `<a class="building-link" href=/buildings/${workspace.workspaceId}>` +
                                workspace.streetNumber +
                                ' ' +
                                workspace.streetName +
                                '</a>',
                        ),
                    )
                    .addTo(map);
            });
        }

        const nav = new mapboxgl.NavigationControl({ showCompass: false });
        map.addControl(nav, 'top-left');
    });

    return (
        <Wrapper>
            <div id="map"></div>
        </Wrapper>
    );
};

export default Map;
