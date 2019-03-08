import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';
import { Link } from 'react-router-dom';
import { isEmail , isLength , isMobilePhone } from 'validator';

import './SignUpView.css';

class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            nickname : '',
            name : '',
            phone : '',
            password : '',
            psw_repeat: '',
            ment : '',
            isSignUp : false
        };

        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    componentWillUnmount() {
        document.removeEventListener("unmount",this.signUpSubmit);
        document.removeEventListener("unmount",this.updateInput);
    }

    updateInput = (e) => {
        this.setState({
            //이벤트의 타겟중 name이란 key값을 이용하여 값 구분
            [e.target.name]:e.target.value
        });
    }

    signUpSubmit = (e) => {
        //submit시 페이지 리로딩 방지
        e.preventDefault();


        if(!isEmail(this.state.email)) {
            this.setState({
                ment : '이메일 형식이 아닙니다. 다시 확인하여 주세요.'
            });
        }else if(!isLength(this.state.password,{min:4})){
            this.setState({
                ment : '비밀번호는 최소 4자리 이상입니다.'
            });
        }else if(!isMobilePhone(this.state.phone)) {
            this.setState({
                ment : '핸드폰 번호 형식이 잘못되었습니다.'
            });
        }else if(this.state.password !== this.state.psw_repeat) {
            this.setState({
                ment: '비밀번호가 일치하지 않습니다.'
            });
        }else {
            // signUp 데이터 정의
            const signUpData = {
                email : this.state.email,
                nickname : this.state.nickname,
                name : this.state.name,
                phone : this.state.phone,
                password : this.state.password
            }

            this.props.onSignUp(signUpData).then(
                (success) => {
                    if(success === 'success') {
                        console.log("가입 성공");
                        this.setState({
                            isSignUp : true
                        });
                    }else{
                        if(success === 'existed') {
                            this.setState({
                                ment : '이미 존재하는 이메일입니다.'
                            });
                        }else if(success === 'over-nickname'){
                            this.setState({
                                ment : '이미 존재하는 닉네임입니다.'
                            });
                        }else {
                            console.log("가입 실패");
                        }
                    }
                }
            )
        }
    }

    cancel() {
        window.history.back();
    }

    render() {
        return(
            <div className="signUp-css">
                <form 
                    className="signUp-form"
                    onSubmit={this.signUpSubmit}>
                    <h1 className="signUp-title"> Sign Up </h1>
                    <p> Please fill in this form to create an account.</p>

                    <label><b>Email</b></label>
                    <input 
                        type="text" 
                        className="signUp-form-input" 
                        placeholder="Enter Email..." 
                        value={this.state.email} 
                        onChange={this.updateInput} 
                        name="email" 
                        required/>

                    <label><b>Nickname</b></label>
                    <input 
                        type="text"     
                        className="signUp-form-input" 
                        placeholder="Enter Nickname..." 
                        value={this.state.nickname} 
                        onChange={this.updateInput} 
                        name="nickname"
                        required/>

                    <label><b>Name</b></label>
                    <input 
                        type="text"     
                        className="signUp-form-input" 
                        placeholder="Enter Name..." 
                        value={this.state.name} 
                        onChange={this.updateInput} 
                        name="name"
                        required/>

                    <label><b>Phone</b></label>
                    <input 
                        type="text"
                        className="signUp-form-input"
                        placeholder="Enter Phone Number..." 
                        value={this.state.phone} 
                        onChange={this.updateInput} 
                        name="phone"
                        required/>

                    <label><b>Password</b></label>
                    <input 
                        type="password" 
                        className="signUp-form-input"   
                        placeholder="Enter Password..." 
                        value={this.state.password}
                        onChange={this.updateInput} 
                        name="password" 
                        required/>

                    <label><b>Repeat Password</b></label>
                    <input 
                        type="password" 
                        className="signUp-form-input" 
                        placeholder="Repeat Password..." 
                        value={this.state.psw_repeat}
                        onChange={this.updateInput} 
                        name="psw_repeat" 
                        required/>

                    <p className="signup-ment"> {this.state.ment} </p>
                    <button 
                        type="submit" 
                        className="signUp-btn">
                        Sign Up
                    </button>
                    <button 
                        type="button" 
                        className="cancel-btn" 
                        onClick={this.cancel}>
                        Cancel
                    </button> 
                </form>
                <section>
                <Modal visible={this.state.isSignUp} width="400" height="300">
                    <div>
                        <h1 className="modal-title">회원가입 성공</h1>
                        <Link to="/login" className="sign-modalLink"><p className="sign-link-ment">로그인 하시겠습니까?</p></Link>
                    </div>
                </Modal>
                </section>
            </div>
        )
    };
};

SignUpView.propTypes = {
    onSignUp : PropTypes.func
};

SignUpView.defaultTypes = {
    onSignUp : (signUpData) => {console.error("sign-up function not defined!");}
};

export default SignUpView;
