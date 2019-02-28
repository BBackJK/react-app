import React from 'react';

import { HomeView , Title } from '../../components';
import { NavBar } from '../../containers';

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            isLogged : false
        };
    };

    render() {
        return (
            <div>
                <Title/>
                <NavBar/>
                <HomeView/>
            </div>
        );
    }
};

export default Home;
