import React from 'react';
import { connect } from 'react-redux'; 

import { MyPageView , CheckPWView , Title } from '../../components';
import { updateRequest , deleteRequest } from '../../actions/authentication';
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
    }

    componentWillUnmount() {
        document.removeEventListener("unmount",this.delete);
        document.removeEventListener("unmount",this.modify_check);
    }
    
    callbackCheckPW = (check) => {
        if(check) {
            this.setState({
                checking : true
            });
        };
    }

    delete(email) {
        console.log("delete account!!");
        // const email = storage.get('userInfo').email;
        return this.props.deleteRequest(email).then(
            () => {
                if(this.props.deleteStatus === "SUCCESS") {
                    console.log("계정삭제 성공");
                    storage.remove('loggedUser');
                    storage.remove('userInfo');
                    this.setState({
                        onDelSuccess: true
                    });
                    return true;
                }else {
                    return false;
                }
            }
        )
    }

    modify_check(updateData) {
        console.log(updateData);
        return this.props.updateRequest(updateData).then(
            () => {
                if(this.props.updateStatus === "SUCCESS") {
                    this.setState({
                        onModSuccess : true
                    });
                    return true;
                }else {
                    return false;
                }
            }
        );
    };

    render() {
        return (
            // <div>
            //     <Title/>
            //     <MyPageView onModify={this.modify_check}
            //                 onDelete={this.delete}/>
            //     <CheckPWView checkingPW={this.callbackCheckPW}/>
            // </div>
            <div>
                {
                    !this.state.checking ? <CheckPWView checkingPW={this.callbackCheckPW}/> : <div><Title/><MyPageView onModify={this.modify_check} onDelete={this.delete}/></div>
                }
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        updateStatus : state.authentication.update.status,
        deleteStatus : state.authentication.delete.status
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRequest : (updateData) => {
            return dispatch(updateRequest(updateData));
        },
        deleteRequest : (email) => {
            return dispatch(deleteRequest(email));
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(MyPage);
