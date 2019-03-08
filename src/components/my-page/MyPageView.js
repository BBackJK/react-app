import React from 'react';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import storage from '../../lib/storage';

import './MyPageView.css';

class MyPageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modNickname : storage.get('userInfo').nickname,
            modName : storage.get('userInfo').name,
            modPhone : storage.get('userInfo').phone,
            modPW : storage.get('userInfo').password,
            ment : '',
            isModify : false,
            isModSuccess : false,
            isDelete : false,
            isLogout : false
        }
        this.modify = this.modify.bind(this);
        this.delete = this.delete.bind(this);
        this.modify_check = this.modify_check.bind(this);
        this.modify_cancel = this.modify_cancel.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    //메모리 누수 방지 메소드
    componentWillUnmount() {
        document.removeEventListener("unmount",this.modify);
        document.removeEventListener("unmount",this.modify_cancel);
        document.removeEventListener("unmount",this.modify_check);
        document.removeEventListener("unmount",this.updateInput);
        document.removeEventListener("unmount",this.delete);
        document.removeEventListener("unmount",this.handleLogout);
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    //변경할지 말지 체크하는 메소드
    modify() {
        this.setState({
            isModify : true
        });
    }

    //계정삭제 메소드
    delete() {
        const email = storage.get('userInfo').email;
        this.props.onDelete(email).then(
            (success) => {
                if(success) {
                    console.log("계정삭제 성공 success는?", success);
                    this.setState({
                        isDelete : true
                    });
                }else {
                    console.log(success);
                }
            }
        )
    }

    //변경완료메소드
    modify_check() {
        const updateData = {
            nickname : this.state.modNickname,
            name : this.state.modName,
            phone : this.state.modPhone,
            pw : this.state.modPW,
            email : storage.get('userInfo').email
        };

        this.props.onModify(updateData).then(
            (success) => {
                if(success === 'success') {
                    this.setState({
                        isModSuccess : true
                    });
                }else if(success === 'over-nickname') {
                    this.setState({
                        ment : '이미 존재하는 닉네임입니다.'
                    });
                }else {
                    console.log("변경 실패");
                }
            }
        )
    };

    //변경취소메소드
    modify_cancel() {
        this.setState({
            modNickname : storage.get('userInfo').nickname,
            modName : storage.get('userInfo').name,
            modPhone : storage.get('userInfo').phone,
            modPW : storage.get('userInfo').password,
            ment : '',
            isModify : false
        });
    }

    //로그아웃 메소드
    handleLogout() {
        this.props.onLogout().then(
            (success) => {
                if(success) {
                    console.log("로그아웃성공");
                    this.setState({
                        isLogout : true
                    })
                }
            }
        )
    };

    render() {
        if(storage.get('userInfo') != null) {
        const myPageInitView = (
            <div>
                <table className="myPage-table">
                    <thead>
                        <tr>
                            <th className="myPage-th"></th>
                            <th className="myPage-th">Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="myPage-th">email</th>
                            <td className="myPage-td">{storage.get('userInfo').email}</td>
                        </tr>
                        <tr>
                            <th className="myPage-th">nickname</th>
                            <td className="myPage-td">{storage.get('userInfo').nickname}</td>
                        </tr>
                        <tr>
                            <th className="myPage-th">name</th>
                            <td className="myPage-td">{storage.get('userInfo').name}</td>
                        </tr>
                        <tr>
                            <th className="myPage-th">password</th>
                            <td className="myPage-td">{storage.get('userInfo').password}</td>
                        </tr>
                        <tr>
                            <th className="myPage-th">phone</th>
                            <td className="myPage-td">{storage.get('userInfo').phone}</td>
                        </tr>
                        <tr>
                            <th className="myPage-th">date</th>
                            <td className="myPage-td">{storage.get('userInfo').reg_date}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="ma-btn" onClick={this.modify}>Modify Account</button>
                <button className="da-btn" onClick={this.delete}>Delete Account</button>
                <button className="lo-btn" onClick={this.handleLogout}>Logout</button>
            </div>
        );

        const myPageModView = (
            <div>
            <table className="myPage-table">
                <thead>
                    <tr>
                        <th className="myPage-th"></th>
                        <th className="myPage-th">Info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="myPage-th">email</th>
                        <td className="myPage-td">{storage.get('userInfo').email}</td>
                    </tr>
                    <tr>
                        <th className="myPage-th">nickname</th>
                        <td className="myPage-td">
                            <input
                                type="text"
                                className="myPage-table-input"
                                value={this.state.modNickname}
                                onChange={this.updateInput}
                                name="modNickname"
                                />
                        </td>
                    </tr>
                    <tr>
                        <th className="myPage-th">name</th>
                        <td className="myPage-td">
                            <input
                                type="text"
                                className="myPage-table-input"
                                value={this.state.modName}
                                onChange={this.updateInput}
                                name="modName"
                                />
                        </td>
                    </tr>
                    <tr>
                        <th className="myPage-th">password</th>
                        <td className="myPage-td">
                            <input
                                type="password"
                                className="myPage-table-input"
                                value={this.state.modPW}
                                onChange={this.updateInput}
                                name="modPW"
                                />
                        </td>
                    </tr>
                    <tr>
                        <th className="myPage-th">phone</th>
                        <td className="myPage-td">
                            <input
                                type="text"
                                className="myPage-table-input"
                                value={this.state.modPhone}
                                onChange={this.updateInput}
                                name="modPhone"
                                />
                        </td>
                    </tr>
                    <tr>
                        <th className="myPage-th">date</th>
                        <td className="myPage-td">{storage.get('userInfo').reg_date}</td>
                    </tr>
                </tbody>
            </table>
            <p className="mp-ment">{this.state.ment}</p>
            <button className="ma-btn" onClick={this.modify_check}>Modify</button>
            <button className="da-btn" onClick={this.modify_cancel}>Cancel</button>
            <button className="lo-btn" onClick={this.handleLogout}>Logout</button>
            </div>
        );
            
        return (
            <div className="myPage-css">
                <h1 className="myPage-title">My Page</h1>
                {this.state.isModify ? myPageModView : myPageInitView }
                <section>
                    <Modal visible={this.state.isModSuccess} width="400" height="300">
                    <div>
                        <h1 className="modal-title">변경 성공</h1>
                        <Link to="/" className="mp-modalLink"><p className="mp-link-ment">홈페이지로 이동하시겠습니까?</p></Link>
                        {/* <a href="http://localhost:3000/" className="auth-popUpLink">홈페이지로 이동하시겠습니까?</a> */}
                    </div>
                    </Modal>
                </section>
            </div>
        );
        }else{
            return (
                <div>
                <section>
                    <Modal visible={this.state.isLogout} width="400" height="300">
                        <div>
                            <h1 className="modal-title">로그아웃 성공</h1>
                            <Link to="/" className="mp-modalLink"><p className="mp-link-ment">홈페이지로 이동하시겠습니까?</p></Link>
                        </div>
                    </Modal>
                </section>
                <section>
                    <Modal visible={this.state.isDelete} width="400" height="300">
                    <div>
                        <h1 className="modal-title">삭제 성공</h1>
                        <Link to="/" className="mp-modalLink"><p className="mp-link-ment">홈페이지로 이동하시겠습니까?</p></Link>
                    </div>
                    </Modal>
                </section>
                </div>
            )
        }
    };
};

MyPageView.propTypes = {
    onModify : PropTypes.func,
    onDelete : PropTypes.func,
    onLogout : PropTypes.func
};

MyPageView.defaultTypes = {
    onModify : (updateData) => {console.error("modify function not defined");},
    onDelete : (email) => {console.error("delete function not defined");},
    onLogout : () => {console.error("logout function not defined");}
};

export default MyPageView;
