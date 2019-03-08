import React from 'react';

import { FriendBarView } from '../index';
import './HomeView.css';

class HomeView extends React.Component {
    render() {
        return (
            <div className="home-css">
                <div className="left-main">
                <h1>Home Page.</h1>
                </div>
                <div className="right-side">
                    <FriendBarView/>
                </div>
            </div>
        );
    }
};

export default HomeView;
