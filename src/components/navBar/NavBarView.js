import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';

import './NavBarView.css';

class NavBarView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogout : false,
            mypage : 'mypage'
        }
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut() {
        this.props.onLogout().then(
            (success)=> {
                if(success) {
                    console.log("로그아웃 성공했지롱");
                    this.setState({
                        isLogout:true
                    })
                }
            }
        )
    };

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
                    <Link to="/my-page" className="nav-a">My Page</Link>
                </li>
                <li className="nav-li-right">
                    <Link to="/" onClick={this.handleLogOut} className="nav-a">Logout</Link>
                </li>
            </div>
        );
        
        if(!this.state.isLogout){
            return (
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
                        {this.props.isLoggedIn ? navLogoutView : navLoginView}
                </ul>
            );
        }else {
            return (
                <div>
                <Modal visible={true} width="400" height="300" effect="fadeInUp" className="auth-modal">
                    <div>
                        <h1 className="modal-title">로그아웃 성공</h1>
                        {/* <a href="http://localhost:3000/" className="auth-popUpLink">홈페이지로 이동하시겠습니까?</a> */}
                        <Link to="/home" className="auth-popUpLink">홈페이지로 이동하시겠습니까?</Link>
                    </div>
                </Modal>
                </div>
            )
        }
    };
};

NavBarView.propTypes = {
    isLoggedIn : PropTypes.bool,
    onLogout : PropTypes.func
};

NavBarView.defaultProps = {
    isLoggedIn : false,
    onLogout : () => { console.err("logout func is not defined");}
};

export default NavBarView;
