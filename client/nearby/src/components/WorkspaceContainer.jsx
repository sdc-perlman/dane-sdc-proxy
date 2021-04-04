/* eslint-disable react/prop-types */
import React from 'react';
import Workspace from './workspace/Workspace';
import Title from './Title';
import { getWorkspaces } from '../actions';

const WorkspaceContainer = (props = null) => {
    const [locs, setLocs] = React.useState(props.nearbyWorkspaces || null);
    const [allInfo, setAllInfo] = React.useState(props.allWorkspaceInfo || []);
    const [pic, setPic] = React.useState(props.photos || []);

    React.useEffect(() => {
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

    return locs ? (
        <React.Fragment>
            <Title />
            {locs.map((location) => (
                <Workspace key={location.workspaceId} location={location} allInfo={allInfo} pic={pic} />
            ))}
        </React.Fragment>
    ) : null;
};

export default WorkspaceContainer;
