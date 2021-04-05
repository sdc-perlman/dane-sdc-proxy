/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import WorkspaceContainer from './WorkspaceContainer';

const NearbyService = () => {
    return window.initialData ? (
        <WorkspaceContainer nearbyWorkspaces={window.initialData.nearbyWorkspaces} />
    ) : (
        <WorkspaceContainer />
    );
};

export default NearbyService;
