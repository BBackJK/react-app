import React from 'react';
import PropTypes from 'prop-types';

import './PostView.css';

class PostView extends React.Component {
    
    constructor() {
        super();
        this.cancel = this.cancel.bind(this);

    }

    cancel() {
        console.log(window.history.back());
    }

    render() {
        console.log(this.props.post);
        return (
            <div className="post-css">
                <h1 className="post-form-title">{this.props.post.title}</h1>
                    <table className="post-table">
                        <thead>
                        <tr className="post-table-tr">
                            <th className="post-table-th">Name</th>
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
            </div>
        );
    };
};

PostView.propsTypes = {
    post : PropTypes.object
};

PostView.defaultTypes = {
    post : []
};

export default PostView;
