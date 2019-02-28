import React from 'react';
import './Sign-up.css';
import axios from 'axios';
import { Title } from '../../components';
import { Redirect } from 'react-router-dom';

class SignUp extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            email: '',
            name : '',
            phone : '',
            password : '',
            psw_repeat: '',
            ment : '',
            onSignUp : false
        };

        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
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

        if(this.state.password !== this.state.psw_repeat) {

            this.setState({
                ment: '비밀번호가 일치하지 않습니다.'
            });
        }else {
            // signUp 데이터 정의
            const signUpData = {
                email : this.state.email,
                name : this.state.name,
                phone : this.state.phone,
                password : this.state.password
            }

            axios.post('http://localhost:5000/sign-up',signUpData)
                .then((res) => {
                    console.log("RESPONSE RECEIVED : " ,res);
                    //post 데이터 전송 후 state 데이터 초기화
                    this.setState({
                        email:'',
                        name:'',
                        phone:'',
                        password:'',
                        psw_repeat:'',
                        ment :'',
                        onSignUp : true
                    });
                })
                .catch((err) => {
                    console.log("AXIOS ERROR :" ,err.response);
                    if(err.response.data === 'existed') {
                        this.setState ({
                            ment:'이미 가입된 이메일입니다.'
                        })
                    }
                });
        }
    }

    //cancel 버튼
    cancel() {
        window.history.back();
    }

    render(){
        const onSignUp = this.state.onSignUp;
        if(!onSignUp){
        return (
            <div className="signUp-css">
            <Title/>
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

                    <p className="advise-ment"> {this.state.ment} </p>
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
            </div>
        );
        }else {
            return <Redirect to='/login'/>
        }
    }
}

export default SignUp;
