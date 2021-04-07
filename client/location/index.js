import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Map from './Components/Map';
import NearbyTransitList from './Components/NearbyTransitList';

const App = () => {
    const [locationData, updateLocationData] = useState({
        origin: {
            rawAddress: '4011 S Central Ave, Los Angeles, CA 90011, USA',
            coordinates: [34.0105442, -118.2569161],
            formattedAddress: '4011 S Central Ave, Los Angeles, CA 90011, USA',
            streetName: 'South Central Avenue',
            streetNumber: '4011',
            neighborhood: 'South Los Angeles',
            city: 'Los Angeles',
            state: 'CA',
            country: 'United States',
            countryCode: 'US',
            zipcode: '90011',
            _id: '604997d783f12ac5bbc6a059',
            geometry: { type: 'Point', coordinates: [-118.2569161, 34.0105442], _id: '604997d783f12ac5bbc6a05a' },
            workspaceId: 1,
            workspaceSlug: 'waistcoat-shabby',
            workspace: '6016623df463365dd660f3bb',
            __v: 0,
        },
    });

    const [nearbyTransits, updateNearbyTransits] = useState([]);
    const { origin } = locationData;
    const { streetName, streetNumber, city, state, zip } = origin;

    useEffect(() => {
        let splitUrl = window.location.pathname.split('/').filter((el) => el);
        const id = splitUrl[splitUrl.length - 1];

        //fetch(`/api/nearbyworkspaces/buildings/${id}`)
        //  .then(data => {
        //    return data.json()
        //  })
        //  .then(json => {
        //    updateLocationData(json);
        //  })
        //  .catch(err => {
        //    console.error(err);
        //  });

        fetch(`/api/getNearbyTransitOptions/${id}`)
            .then((data) => {
                return data.json();
            })
            .then((json) => {
                const options = json.nearbyTransitOptions;
                updateNearbyTransits(options);
            });
    }, []);

    return (
        <div className="map-wrapper">
            <h2
                style={{
                    fontSize: '2rem',
                    fontWeight: '600',
                    lineHeight: '2.75rem',
                    marginBottom: '1rem',
                }}
            >
                Location
            </h2>
            <address
                style={{
                    whiteSpace: 'pre-line',
                    marginBottom: '2rem',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    lineHeight: '1.5rem',
                }}
            >
                {streetNumber} {streetName}
                <br />
                {city}, {state} {zip}
            </address>
            <Map locationData={locationData} />
            <NearbyTransitList nearbyTransits={nearbyTransits} />
        </div>
    );
};

const root = document.getElementById('location-service');
ReactDOM.render(<App />, root);
