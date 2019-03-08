import React from 'react';
import { connect } from 'react-redux';

import { LoginView , Title } from '../../components';
import { loginRequest } from '../../actions/authentication';
import storage from '../../lib/storage';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    loginSubmit(email,pw) {
        return this.props.loginRequest(email,pw).then(
            () => {
                if(this.props.status === "SUCCESS") {

                    //이렇게 하는이유?
                    //reducer에있는 auth에 login-status와 연결했기 때문에..
                    //즉, status-useremail에 연결할수 없기때문에 가져오기가 힘들다.
                    let loginData = {
                        isLoggedIn : true,
                        email : email
                    };
                    storage.set('loggedUser',loginData);
                    console.log(storage.get('loggedUser'));
                    return true;
                } else {
                    return false;
                }
            }
        );
    };
    
    render() {
        return (
            <div>
                <Title/>
                <LoginView onLogin={this.loginSubmit}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status : state.authentication.login.status
        //authentication은 reducer에 있는 export default에 있는 authentication
        //이 값(return state)이 status와 매핑되면서 this.props.status로 읽힌다.
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest : (email,pw) => {
            return dispatch(loginRequest(email, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
