import React from 'react';
import { connect } from 'react-redux';

import { FindAccountView , Title } from '../../components';
import { findEmailRequest , findPWRequest } from '../../actions/authentication';

class FindAccount extends React.Component {
    constructor(props) {
        super(props);
        this.findEmailSubmit = this.findEmailSubmit.bind(this);
        this.findPWSubmit = this.findPWSubmit.bind(this);
    }

    findEmailSubmit(findEmailData){
        return this.props.findEmailRequest(findEmailData).then(
            () => {
                if(this.props.findStatus.emailStatus === "SUCCESS"){
                    console.log("이메일 찾음");
                    console.log("이메일은 : ", this.props.findStatus.email);
                    return this.props.findStatus.email;
                }else {
                    console.log("이메일 못찾음");
                    return false;
                }
            }
        )
    }

    findPWSubmit(findPWdata) {
        return this.props.findPWRequest(findPWdata).then(
            () => {
                if(this.props.findStatus.pwStatus === "SUCCESS") {
                    console.log("비밀번호 찾음");
                    console.log("비밀번호는 : ", this.props.findStatus.password);
                    return this.props.findStatus.password;
                }else {
                    console.log("비밀번호 못찾음");
                    return false;
                }
            }
        )
    }

    render() {
        return (
            <div>
            <Title/>
            <FindAccountView onFindEmail={this.findEmailSubmit}
                                onFindPW={this.findPWSubmit}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        findStatus : state.authentication.find
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        findEmailRequest : (findEmailData) => {
            return dispatch(findEmailRequest(findEmailData));
        },
        findPWRequest : (findPWdata) => {
            return dispatch(findPWRequest(findPWdata));
        }
    };
};


export default connect(mapStateToProps, mapDispatchProps)(FindAccount);
