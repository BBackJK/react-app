import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';
import { Link } from 'react-router-dom';

import './PostView.css';

class PostView extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isCancel : false,
            checkBoard : ''
        }

        this.cancel = this.cancel.bind(this);

    }

    cancel() {
        console.log(this.props.mode);
        this.setState({
            isCancel : true
        });
        switch(this.props.mode) {
            case '1':
                this.setState({
                    checkBoard : 'front'
                });
                break;
            case '2':
                this.setState({
                    checkBoard : 'back'
                });
                break;
            case '3':
                this.setState({
                    checkBoard : 'common'
                });
                break;
            default:
                console.log("default");
        };
    }


    render() {
        console.log(this.props.post);
        return (
            <div className="post-css">
                <h1 className="post-form-title">{this.props.post.title}</h1>
                    <table className="post-table">
                        <thead>
                        <tr className="post-table-tr">
                            <th className="post-table-th">Nickname</th>
                            <td className="post-table-td">
                                {this.props.post.user_name}
                            </td>   
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="post-table-tr">
                            <th className="post-table-th">Category</th>
                            <td className="post-table-td">
                                {this.props.post.category}
                            </td>
                        </tr>
                        <tr className="post-table-tr">    
                            <th className="post-table-th"> Contents </th>
                            <td colSpan="2">
                                <textarea 
                                    rows="17"
                                    cols="50"
                                    className="post-table-textarea"
                                    name="contents"
                                    defaultValue={this.props.post.contents}>
                                </textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {/* <button 
                        type="submit"    
                        className="write-ok-btn">
                        Write
                    </button> */}
                    <button 
                        type="button"
                        className="post-cancel-btn"
                        onClick={this.cancel}>
                        Cancel    
                    </button>
                    <section>
                    <Modal visible={this.state.isCancel} width="400" height="300">
                        <div>
                            <Link to={`/${this.state.checkBoard}`} className="pv-modalLink"><h2 className="pv-link-ment">게시판으로 이동하시겠습니까?</h2></Link>
                        </div>
                    </Modal>
                    </section>
            </div>
        );
    };
};

PostView.propsTypes = {
    post : PropTypes.object,
    mode : PropTypes.String
};

PostView.defaultTypes = {
    post : [],
    mode : ''
};

export default PostView;
