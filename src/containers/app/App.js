import React from 'react';
import { connect } from 'react-redux';

import { Title , NavBar } from '../../components';
import { getStatusRequest } from '../../actions/authentication';
import storage from '../../lib/storage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged : false
        };
    }
    
    componentDidMount() {
        const loggedUser = storage.get('loggedUser');
        //로그인유저가 있다고 가정...왜? 이렇게 안해주면 다 에러난다.
        console.log(loggedUser);
        if(loggedUser != null) {
            this.setState({
                isLogged : true
            });

            const email = loggedUser.email;
            //로그인 할때 세션에 저장했던 로그인정보(이메일)를 가지고 getInfo를 해오는것.
            this.props.getStatusRequest(email).then (
                (res) => {
                    if(!this.props.status.valid) {
                        console.log(this.props.status.valid);
                        storage.remove('loggedUser');
                        if(storage.get('userInfo') != null) {
                            //userInfo가 세션에 저장되어있다면?
                            storage.remove('userInfo');
                            //그 세션 삭제
                        };
                    }else {
                        console.log(this.props.status.valid);
                    }
                }   
            );
        }else {
            console.log("로그인된 유저가 없어요..");
        }
    }

    render() {
        return (
            <div>
                <Title/>
                <NavBar isLogged={this.state.isLogged}/>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status : state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest : (email) => {
            return dispatch(getStatusRequest(email));
        },
        // logoutRequest : () => {
        //     return dispatch(logoutRequest());
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
