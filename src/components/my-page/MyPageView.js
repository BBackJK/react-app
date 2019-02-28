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
            modName : '',
            modPhone : '',
            modPW : '',
            isModify : false,
            isModSuccess : false
        }
        this.modify = this.modify.bind(this);
        this.delete = this.delete.bind(this);
        this.modify_check = this.modify_check.bind(this);
        this.modify_cancel = this.modify_cancel.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    modify() {
        this.setState({
            isModify : true
        });
    }

    delete() {
        const email = storage.get('userInfo').email;
        this.props.onDelete(email).then(
            (success) => {
                if(success) {
                    console.log("계정삭제 성공 success는?", success);
                }else {
                    console.log(success);
                }
            }
        )
    }

    modify_check() {
        const updateData = {
            name : this.state.modName,
            phone : this.state.modPhone,
            pw : this.state.modPW,
            email : storage.get('userInfo').email
        };
        this.props.onModify(updateData).then(
            (success) => {
                if(success) {
                    this.setState({
                        isModSuccess : true
                    });
                }else {
                    console.log(success);
                }
            }
        )
    };

    modify_cancel() {
        this.setState({
            modName : '',
            modPhone : '',
            modPW : '',
            isModify : false
        });
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    componentWillUnmount() {
        document.removeEventListener("unmount",this.modify);
        document.removeEventListener("unmount",this.modify_cancel);
        document.removeEventListener("unmount",this.modify_check);
        document.removeEventListener("unmount",this.updateInput);
        document.removeEventListener("unmount",this.delete);
    }

    render() {
        if(storage.get('userInfo') != null) {
        const userInfo = storage.get('userInfo');
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
                            <td className="myPage-td">{userInfo.email}</td>
                        </tr>
                        <tr>
                            <th className="myPage-th">name</th>
                            <td className="myPage-td">{userInfo.name}</td>
                        </tr>
                        <tr>
                            <th className="myPage-th">password</th>
                            <td className="myPage-td">{userInfo.password}</td>
                        </tr>
                        <tr>
                            <th className="myPage-th">phone</th>
                            <td className="myPage-td">{userInfo.phone}</td>
                        </tr>
                        <tr>
                            <th className="myPage-th">date</th>
                            <td className="myPage-td">{userInfo.reg_date}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="ma-btn" onClick={this.modify}>Modify Account</button>
                <button className="da-btn" onClick={this.delete}>Delete Account</button>
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
                        <td className="myPage-td">{userInfo.email}</td>
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
                                placeholder={userInfo.name}/>
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
                                placeholder={userInfo.password}/>
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
                                placeholder={userInfo.phone}/>
                        </td>
                    </tr>
                    <tr>
                        <th className="myPage-th">date</th>
                        <td className="myPage-td">{userInfo.reg_date}</td>
                    </tr>
                </tbody>
            </table>
            <button className="ma-btn" onClick={this.modify_check}>Modify</button>
            <button className="da-btn" onClick={this.modify_cancel}>Cancel</button>
            </div>
        );
        if(!this.state.isModSuccess) {
            return (
                <div className="myPage-css">
                    <h1 className="myPage-title">My Page</h1>
                    {this.state.isModify ? myPageModView : myPageInitView }
                </div>
            );
        }else if(this.state.isModSuccess){
            return (
                <div>
                <Modal visible={true} width="400" height="300" effect="fadeInUp" className="auth-modal">
                    <div>
                        <h1 className="modal-title">변경 성공</h1>
                        <Link to="/" className="auth-popUpLink">홈페이지로 이동하시겠습니까?</Link>
                    </div>
                </Modal>
                </div>
            )
        }
    }else{
        return (
            <div>
            <Modal visible={true} width="400" height="300" effect="fadeInUp" className="auth-modal">
                <div>
                    <h1 className="modal-title">삭제 성공</h1>
                    <Link to="/" className="auth-popUpLink">홈페이지로 이동하시겠습니까?</Link>
                </div>
            </Modal>
            </div>
        )
        }
    };
};

MyPageView.propTypes = {
    onModify : PropTypes.func,
    onDelete : PropTypes.func
};

MyPageView.defaultTypes = {
    onModify : (updateData) => {console.error("modify function not defined");},
    onDelete : (email) => {console.error("delete function not defined");}
};

export default MyPageView;
