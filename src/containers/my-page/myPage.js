import React from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';

import { MyPageView , CheckPWView , Title } from '../../components';
import { updateRequest , deleteRequest , logoutRequest } from '../../actions/authentication';
import storage from '../../lib/storage';

class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checking : false
        };

        this.delete = this.delete.bind(this);
        this.modify_check = this.modify_check.bind(this);
        this.callbackCheckPW = this.callbackCheckPW.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    //비밀번호 체크 콜백 메소드
    callbackCheckPW = (check) => {
        if(check) {
            this.setState({
                checking : true
            });
        };
    }

    //계정 삭제 메소드
    delete(email) {
        console.log("delete account!!");
        // const email = storage.get('userInfo').email;
        return this.props.deleteRequest(email).then(
            () => {
                if(this.props.deleteStatus === "SUCCESS") {
                    console.log("계정삭제 성공");
                    storage.remove('loggedUser');
                    storage.remove('userInfo');
                    return true;
                }else {
                    return false;
                }
            }
        )
    }

    //계정정보 변경 메소드
    modify_check(updateData) {
        return this.props.updateRequest(updateData).then(
            () => {
                if(this.props.updateStatus.status === "SUCCESS") {
                    return 'success';
                }else {
                    return this.props.updateStatus.error;
                }
            }
        );
    };

    //로그아웃 메소드
    handleLogout() {
        return this.props.logoutRequest().then(
            () => {
                if(!this.props.isLoggedIn) {
                    storage.remove('loggedUser');
                    console.log("loggedUser 삭제했다");
                    if(storage.get('userInfo') != null) {
                        storage.remove('userInfo');
                        console.log("userInfo 삭제했다");
                    };
                    console.log("true값 mypageview로 리턴한다~");
                    return true;
                }else {
                    return false;
                }
            }
        )
    }

    render() {
        if(storage.get('loggedUser') == null) {
            return (
                <div>
                <Modal visible={true} width="400" height="300" effect="fadeInUp">
                    <div>
                        <h1 className="modal-title">로그인 상태가 아닙니다</h1>
                        <Link to="/login" className="mp-modalLink"><p className="mp-link-ment">로그인 하시겠습니까?</p></Link>
                    </div>
                </Modal>
                </div>
            )
        }else {
            return (
                <div>
                    {
                        !this.state.checking ? <CheckPWView checkingPW={this.callbackCheckPW}/> : <div><Title/><MyPageView onModify={this.modify_check} onDelete={this.delete} onLogout={this.handleLogout}/></div>
                    }
                </div>
            )
        }
    };
};

const mapStateToProps = (state) => {
    return {
        updateStatus : state.authentication.update,
        deleteStatus : state.authentication.delete.status,
        logoutStatus : state.authentication.status
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRequest : (updateData) => {
            return dispatch(updateRequest(updateData));
        },
        deleteRequest : (email) => {
            return dispatch(deleteRequest(email));
        },
        logoutRequest : () => {
            return dispatch(logoutRequest());
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(MyPage);
