/* eslint-disable react/prop-types */
import React from 'react';
import Workspace from './workspace/Workspace';
import Title from './Title';
import { getNearbyWorkspaces } from '../actions';

const WorkspaceContainer = (props) => {
    const [locs, setLocs] = React.useState(props.nearbyWorkspaces || []);

    React.useEffect(() => {
        if (locs.length === 0) {
            getNearbyWorkspaces()
                .then(({ nearbyWorkspaces }) => {
                    setLocs(nearbyWorkspaces);
                })
                .catch(() => setLocs([]));
        }
    }, []);

    return locs.length > 0 ? (
        <React.Fragment>
            <Title />
            {locs.map((loc, i) => (
                <Workspace key={i} location={loc} />
            ))}
        </React.Fragment>
    ) : null;
};

export default WorkspaceContainer;
