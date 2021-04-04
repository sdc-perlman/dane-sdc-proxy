/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import WorkspaceContainer from './WorkspaceContainer';

const NearbyService = () => {
    return window.__initialData__ ? (
        <WorkspaceContainer
            nearbyWorkspaces={window.__initialData__.nearbyWorkspaces}
            allWorkspaceInfo={window.__initialData__.allWorkspaceInfo}
            photos={window.__initialData__.photos}
        />
    ) : (
        <WorkspaceContainer />
    );
};

export default NearbyService;
