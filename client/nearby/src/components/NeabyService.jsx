/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import WorkspaceContainer from './WorkspaceContainer';

const NearbyService = () => {
    return window.__initialData__ ? (
        <WorkspaceContainer nearbyWorkspaces={window.initialData.nearbyWorkspaces} />
    ) : (
        <WorkspaceContainer />
    );
};

export default NearbyService;
