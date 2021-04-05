/* eslint-disable react/prop-types */
import React from 'react';

function Amenities({ amenities }) {
    const rest = amenities.length - 5;

    return (
        <React.Fragment>
            {amenities.map(
                (am, i) =>
                    i < 5 && (
                        <li key={`${am.name}-${am._id}`}>
                            {am.name + ' '}
                            &#8226;{' '}
                        </li>
                    ),
            )}
            <br />
            {rest > 0 && <li> {rest}+</li>}
        </React.Fragment>
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
                            <h3 className="nb-description-title ">{location.name || ''}</h3>
                            <p className="light-text bold-text" style={{ marginTop: '0px' }}>
                                {location.neighborhood || ''}
                            </p>
                        </div>
                        <div className="light-text small-text bold-text" style={{ marginTop: '40px' }}>
                            <ul className="nb-amenities-list">
                                {location.amenities.length && <Amenities amenities={location.amenities} />}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="nb-pricing-container dark-text">
                    <div className="nb-pricing-label bold-text pad-10">
                        <p>Available workspace</p>
                    </div>
                    <div className="nb-pricing-price pad-10">
                        {location.membership_rate ? (
                            <p>
                                from <span className="bolder-text">${location.membership_rate}/mo</span>
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
