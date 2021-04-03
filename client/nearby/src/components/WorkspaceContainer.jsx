/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Workspace from './workspace/Workspace';
import Title from './Title';
import { getWorkspaces } from '../actions';

const WorkspaceContainer = (props = null) => {
    const [locs, setLocs] = useState(props.nearbyWorkspaces || null);
    const [allIds, setAllIds] = useState([]);
    const [allInfo, setAllInfo] = useState(props.allWorkspaceInfo || []);
    const [pic, setPic] = useState(props.photos || []);

    useEffect(() => {
        if (!props) {
            getWorkspaces()
                .then(({ nearbyWorkspaces, allWorkspaceInfo, photos }) => {
                    setLocs(nearbyWorkspaces);
                    setAllInfo(allWorkspaceInfo);
                    setPic(photos);
                })
                .catch(() => setLocs(false));
        }
    }, []);

    return locs.length > 0 ? (
        <>
            <Title />
            {locs.map((location) => (
                <Workspace
                    key={location.workspaceId}
                    location={location}
                    allIds={allIds}
                    allInfo={allInfo}
                    details={null}
                    pic={pic}
                />
            ))}
        </>
    ) : null;
};

export default WorkspaceContainer;
