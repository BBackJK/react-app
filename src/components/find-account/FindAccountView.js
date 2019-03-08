import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './FindAccountView.css';

class FindAccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            name_email : '',
            name_pw: '',
            phone : '',
            ment_email : '',
            ment_pw: '',
            onEmail : false,
            onPassword : false
        }

        this.updateInput = this.updateInput.bind(this);
        this.findEmailSubmit = this.findEmailSubmit.bind(this);
        this.findPWSubmit = this.findPWSubmit.bind(this);
    }

    componentWillUnmount() {
        document.removeEventListener("unmount",this.updateInput);
        document.removeEventListener("unmount",this.findEmailSubmit);
        document.removeEventListener("unmount",this.findPWSubmit);
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    findEmailSubmit = (e) => {
        e.preventDefault();
        const findEmailData = {
            name_email : this.state.name_email,
            phone : this.state.phone
        }
        axios.post('http://localhost:5000/find-account',findEmailData)
            .then((res)=>{
                this.setState({
                    onEmail : true ,
                    ment_email : '이메일은 ' + res.data[0].email + ' 입니다.'
                })
            })
            .catch((err)=>{
                this.setState({
                    ment_email : '정보를 찾을 수 없습니다. 다시한번 확인해주세요.'  
                })
            })
    }

    findPWSubmit = (e) => {
        e.preventDefault();
        const findPWdata = {
            email : this.state.email,
            name_pw : this.state.name_pw
        }

        axios.post('http://localhost:5000/find-account',findPWdata)
            .then((res) => {
                console.log("RESPONSE RECEIVED : " ,res);
                this.setState({
                    onPassword : true,
                    ment_pw : '비밀번호는 ' + res.data[0].password + ' 입니다'
                })
            })
            .catch((err) =>{
                this.setState({
                    ment_pw : '정보를 찾을 수 없습니다. 다시한번 확인해주세요.'  
                })
            })
        
    }

    cancel() {
        window.history.back();
    }
    
    render() {
        const onEmail = this.state.onEmail;
        const onPassword = this.state.onPassword;
        return (
            <div className="findAccount-css">
                <div className="findAccount-css-left">
                    <form 
                        className="findAccount-form"
                        onSubmit={this.findEmailSubmit}>
                        <h2 className="findAccount-title"> Find Account Email </h2>

                        <label className="findAccount-label"><b>Name</b></label>
                        <input 
                            type="text" 
                            className="findAccount-form-input" 
                            placeholder="Enter Name..." 
                            value={this.state.name}
                            onChange={this.updateInput}
                            name="name_email" 
                            required/>

                        <label className="findAccount-label"><b>Phone</b></label>
                        <input 
                            type="text" 
                            className="findAccount-form-input" 
                            placeholder="Enter Phone-num..." 
                            value={this.state.phone}
                            onChange={this.updateInput}
                            name="phone" 
                            required/>

                        <button type="submit" className="findEmail-btn" >Find Email</button>
                        <button type="button" className="findCancel-btn" onClick={this.cancel}>Cancel</button>
                        <p className="findAccount-ment">
                        {
                            onEmail && this.state.ment_email
                        }
                        {
                            !onEmail && this.state.ment_email
                        }
                        <br></br>
                        <Link to="/login">
                        {
                            onEmail && "로그인하시겠습니까?"
                        }
                        </Link>
                        </p>
                    </form>
                </div>
                <div className="findAccount-css-right">
                    <form 
                        className="findAccount-form"
                        onSubmit={this.findPWSubmit}>
                        <h2 className="findAccount-title"> Find Account Password </h2>
                    
                        <label className="findAccount-label"><b>Email</b></label>
                        <input 
                            type="text" 
                            className="findAccount-form-input" 
                            placeholder="Enter Email..." 
                            value={this.state.email}
                            onChange={this.updateInput}
                            name="email" 
                            required/>
        
                        <label className="findAccount-label"><b>Name</b></label>
                        <input 
                            type="text" 
                            className="findAccount-form-input" 
                            placeholder="Enter Name..."
                            value={this.state.name}
                            onChange={this.updateInput}
                            name="name_pw" 
                            required/>
        
                        <button type="submit" className="findPW-btn">Find PW</button>
                        <button type="button" className="findCancel-btn" onClick={this.cancel}>Cancel</button>
                        <p className="findAccount-ment">
                        {
                            onPassword && this.state.ment_pw
                        }
                        {
                            !onPassword && this.state.ment_pw
                        }
                        <br></br>
                        <Link to="/login">
                        {
                            onPassword && "로그인하시겠습니까?"
                        }
                        </Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default FindAccountView;
