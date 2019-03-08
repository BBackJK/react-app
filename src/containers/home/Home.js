import React from 'react';

import { HomeView , Title , NavBar } from '../../components';
import storage from '../../lib/storage';

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            isLogged : false
        };
    };

    componentDidMount() {
        if(storage.get('loggedUser') != null) {
            this.setState({
                isLogged : true
            });
        }
    }

    render() {

        return (
            <div>
                <Title/>
                <NavBar isLogged={this.state.isLogged}/>
                <HomeView/>
            </div>
        );
    }
};

export default Home;
