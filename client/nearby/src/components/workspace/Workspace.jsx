/* eslint-disable react/prop-types */
import React from 'react';

function Amenities({ amenities }) {
    const amensArr = amenities.split(',');
    if (!amenities) {
        return <></>;
    }
    const rest = amensArr.length - 5;
    return (
        <>
            {amensArr.map((am, id) => (
                <li key={`${am}-${id}`}>
                    &#8226;
                    {am}
                </li>
            ))}
            <br />
            {rest > 0 && <li>{` + ${rest} more `}</li>}
        </>
    );
}

const Workspace = ({ location }) => {
    return (
        <div className="nb-container">
            <a href={`/buildings/${location.workspaceId}`} className="light-text">
                <div className="nb-grid">
                    <div className="nb-photo-container">
                        <img className="nb-photo" src={location.photo.url} alt="" />
                    </div>
                    <div className="nb-description-container">
                        <div>
                            <h3 className="nb-description-title ">
                                {location.streetNumber || ''} {location.streetName || ''}
                            </h3>
                            <p className="light-text bold-text" style={{ marginTop: '0px' }}>
                                {location.neighborhood || ''}
                            </p>
                        </div>
                        <div className="light-text small-text bold-text" style={{ marginTop: '40px' }}>
                            <ul className="nb-amenities-list">
                                <Amenities amenities={location.amenities} />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="nb-pricing-container dark-text">
                    <div className="nb-pricing-label bold-text pad-10">
                        <p>Available workspace</p>
                    </div>
                    <div className="nb-pricing-price pad-10">
                        {location.rate ? (
                            <p>
                                from <span className="bolder-text">${location.rate}/mo</span>
                            </p>
                        ) : (
                            <p>View Inventory</p>
                        )}
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Workspace;
