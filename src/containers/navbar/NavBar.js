import React from 'react';
import { connect } from 'react-redux';

import { logoutRequest } from '../../actions/authentication';
import { NavBarView } from '../../components/';
import storage from '../../lib/storage';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentWillMount() {
        if(storage.get('loggedUser') != null) {
            this.setState({
                isLogged : true
            });
        };;
    }

    handleLogOut() {
        return this.props.logoutRequest().then(
            () => {
                if(!this.props.isLoggedIn){
                    storage.remove('loggedUser');
                    if(storage.get('userInfo') != null) {
                        storage.remove('userInfo');
                    };
                    return true;
                }else {
                    return false;
                }
            }
        )
    }

    render() {
        return <NavBarView isLoggedIn={this.props.status.isLoggedIn}
                            onLogout={this.handleLogOut}/>
    };
};

const mapStateToProps = (state) => {
    return {
        status : state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutRequest : () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
