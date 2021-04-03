/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import WorkspaceContainer from './WorkspaceContainer';

const NearbyService = () => {
    return window.__initialData__ ? (
        <WorkspaceContainer
            nearbyWorkspaces={window.__initialData__.nearby.nearbyWorkspaces}
            allWorkspaceInfo={window.__initialData__.nearby.allWorkspaceInfo}
            photos={window.__initialData__.nearby.photos}
        />
    ) : (
        <WorkspaceContainer />
    );
};

export default NearbyService;
