import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PhotosService from './components/PhotosService';

ReactDOM.hydrate(
    <Router>
        <Switch>
            <Route exact path="/">
                <Redirect to="/buildings/1" />
            </Route>
            <Route path="/buildings/:workspaceId">
                <PhotosService />
            </Route>
        </Switch>
    </Router>,
    document.getElementById('photos-slider'),
);
