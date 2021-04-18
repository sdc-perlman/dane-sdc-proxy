/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Components/Map';
import NearbyTransitList from './Components/NearbyTransitList';

const App = (props) => {
    const [locationData, updateLocationData] = React.useState({
        origin: null,
        nearbyWorkspaces: null,
    });

    const [nearbyTransits, updateNearbyTransits] = React.useState(props.nearbyTransits || []);

    React.useEffect(() => {
        let splitUrl = window.location.pathname.split('/').filter((el) => el);
        const id = splitUrl[splitUrl.length - 1];

        if (!props.nearbyTransits) {
            fetch(`/api/getNearbyTransitOptions/${id}`)
                .then((data) => {
                    return data.json();
                })
                .then((json) => {
                    const options = json.nearbyTransitOptions;
                    updateNearbyTransits(options);
                });
        }

        fetch(`/api/nearbyworkspaces/buildings/origin/${id}`)
            .then((res) => res.json())
            .then((data) => {
                updateLocationData({ nearbyWorkspaces: data.nearbyWorkspaces, origin: data.origin });
            });
    }, []);

    return (
        locationData.origin && (
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
                    {locationData.origin.streetNumber} {locationData.origin.streetName}
                    <br />
                    {locationData.origin.city}, {locationData.origin.state} {locationData.origin.zipCode}
                </address>
                <Map locationData={locationData} />
                <NearbyTransitList nearbyTransits={nearbyTransits} />
            </div>
        )
    );
};

const root = document.getElementById('location-service');
ReactDOM.render(window.initialData ? <App nearbyTransits={window.initialData.nearbyTransitOptions} /> : <App />, root);

export default App;
