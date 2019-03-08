import React from 'react';
import { connect } from 'react-redux';

import { Title , SignUpView } from '../../components';
import { signUpRequest } from '../../actions/authentication';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.signUpSubmit = this.signUpSubmit.bind(this);
    }

    signUpSubmit(signUpData){
       return this.props.signUpRequest(signUpData).then(
           () => {
                if(this.props.signUpStatus.status === "SUCCESS") {
                    return 'success';
                }else {
                    return this.props.signUpStatus.error;
                }
           }
       );
    };

    render(){
        return(
            <div>
                <Title/>
                <SignUpView onSignUp={this.signUpSubmit}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return  {
        signUpStatus : state.authentication.signUp
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUpRequest : (signUpData) => {
            return dispatch(signUpRequest(signUpData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
