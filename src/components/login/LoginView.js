import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';
import { Link } from 'react-router-dom';

import './LoginView.css';

class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email :'',
            password: '',
            ment:'',
            successLogin : false
        };
        this.updateInput = this.updateInput.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    loginSubmit = (e) => {
        e.preventDefault();

        let email = this.state.email;
        let pw = this.state.password;

        this.props.onLogin(email,pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: '',
                        ment: '로그인에 실패했습니다.이메일과 비밀번호를 확인하여 주세요.'
                    });
                }else {
                    this.setState({
                        successLogin:true
                    });
                }
            }
        );
    };

    render() {
        const successLogin = this.state.successLogin;

        if(!successLogin){
            return (
                <div className="login-css">
                    <form 
                        className="login-form"
                        onSubmit={this.loginSubmit}>
                        <h2 className="login-form-header"> Login</h2>
                        <input 
                            type="text" 
                            className="login-form-input" 
                            placeholder="Your Email..." 
                            name="email"
                            value={this.state.email}
                            onChange={this.updateInput}
                            required autoFocus/>
                        <input 
                            type="password" 
                            className="login-form-input" 
                            placeholder="Email to Password..."
                            name="password"
                            value={this.state.password}
                            onChange={this.updateInput}
                            required />
                        <p className="login-ment">{this.state.ment}</p>
                        <button className="loginBtn" type="submit">Login</button>
                        <p className="forgot-ment">
                            <Link to="/findAccount">
                                Forgot account?
                            </Link>
                        </p>
                    </form>
                </div>
            );
        }else {
            return (
                <div>
                <Modal visible={true} width="400" height="300" effect="fadeInUp" className="auth-modal">
                    <div>
                        <h1 className="modal-title">로그인 성공</h1>
                        <Link to="/" className="auth-popUpLink">홈페이지로 이동하시겠습니까?</Link>
                    </div>
                </Modal>
                </div>
            )
        }
    };
};

LoginView.propTypes = {
    onLogin : PropTypes.func
};

LoginView.defaultTypes = {
    onLogin : (email,pw) => {console.error("login function not defined");}
};

export default LoginView;
