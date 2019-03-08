import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './NavBar.css';

class NavBar extends React.Component {

    render() {

        const navLoginView = (
            <div>
                <li className="nav-li-right">
                    <Link to="/signUp" className="nav-a">Sign Up</Link>
                </li>
                <li className="nav-li-right">
                    <Link to="/login" className="nav-a">Login</Link>
                </li>
            </div>
        );

        const navLogoutView = (
            <div>
                <li className="nav-li-right">
                    <Link to="/signUp" className="nav-a">Sign Up</Link>
                </li>
                <li className="nav-li-right">
                    <Link to="/my-page" className="nav-a">My Page</Link>
                </li>
            </div>
        );
        
        return (
            <div>
                <ul className="nav-ul">
                        <li className="nav-li-left">
                            <Link to="/home" className="nav-a">Home</Link>
                        </li>
                        <li className="nav-li-left">
                            <Link to="/front" className="nav-a">Front</Link>
                        </li>
                        <li className="nav-li-left">
                            <Link to="/back" className="nav-a">Back</Link>    
                        </li>
                        <li className="nav-li-left">
                            <Link to="/common" className="nav-a">Common</Link>    
                        </li>
                        {this.props.isLogged ? navLogoutView : navLoginView}
                </ul>
            </div>
        )
    };
};

NavBar.propTypes = {
    isLogged : PropTypes.bool
};

NavBar.defaultProps = {
    isLogged : false,
};

export default NavBar;
