import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';
import { Link } from 'react-router-dom';

import storage from '../../lib/storage';
import './WriteView.css';

class WriteView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category : '',
            title : '',
            contents : '',
            isCategory : false,     //카테고리를 선택했는지 안했는지
            isWriteSuccess : false,     //글작성 성공. --> modal띄우기 위한 bool
            choiceBoard : ''       //front인지 back인지 확인. --> 카테고리도 확인, 게시판이동시 front인지 back인지 확인
        };

        this.writeSubmit = this.writeSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount() {
        console.log(this.props.board);
        if(this.props.board === 'Front') {
            this.setState({
                choiceBoard : '1'
            });
        }else if(this.props.board === 'Back') {
            this.setState({
                choiceBoard : '2'
            });
        }else if(this.props.board === 'Common') {
            this.setState({
                choiceBoard : '3'
            })
        }
    }

    componentWillUnmount() {
        document.removeEventListener("unmount",this.writeSubmit);
        document.removeEventListener("unmount",this.updateInput);
        document.removeEventListener("unmount",this.cancel);
    }

    writeSubmit = (e) => {
        e.preventDefault();

        const writeData = {
            category : this.state.category,
            title : this.state.title,
            contents : this.state.contents,
            nickname : storage.get('userInfo').nickname,
            div : (this.props.board).toLowerCase()
        };

        console.log(writeData);

        if(writeData.category === '' ) {
            //멘트날리기위한 알고리즘
            this.setState({
                isCategory : true
            })
        }else {
            this.props.onWrite(writeData).then (
                (success) => {
                    if(success) {
                        this.setState({
                            category : '',
                            title : '',
                            contents : '',
                            isCategory : false,
                            isWriteSuccess : true
                        });
                        console.log('작성 성공!');
                    }else {
                        console.log('작성 실패다');
                    }
                }
            )
        }
        
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    cancel() {
        window.history.back();
    }

    render() {
        const frontCategory = (
            <div>
                <select 
                    name="category"
                    value={this.state.category}
                    onChange={this.updateInput}>
                        <option value="">Select Category</option>
                        <option value="React">React</option>
                        <option value="Angular">Angular</option>
                        <option value="Vue">Vue</option>
                        <option value="Html">Html</option>
                        <option value="CSS">CSS</option>
                </select>
            </div>
        );

        const backCategory = (
            <div>
                <select 
                    name="category"
                    value={this.state.category}
                    onChange={this.updateInput}>
                        <option value="">Select Category</option>
                        <option value="Node">Node</option>
                        <option value="Express">Express</option>
                        <option value="Serverless">Serverless</option>
                </select>
            </div>
        );

        const commonCategory = (
            <div>
                <select 
                    name="category"
                    value={this.state.category}
                    onChange={this.updateInput}>
                        <option value="">Select Category</option>
                        <option value="MySQL">MySQL</option>
                        <option value="GrapQL">GrapQL</option>
                        <option value="Html">Html</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="DOM">DOM</option>
                </select>
            </div>
        );

        if(storage.get('loggedUser') == null ) {
            return(
                <div>
                <section>
                <Modal visible={true} width="400" height="300" effect="fadeInUp">
                    <div>
                        <h1 className="modal-title">로그인상태가 아닙니다</h1>
                        <Link to="/login" className="write-modalLink"><p className="write-link-ment">로그인페이지로 이동하시겠습니까?</p></Link>
                    </div>
                </Modal>
                </section>
                </div>
            )
        } else {
            if(this.state.choiceBoard === '1') {
                return(
                    <div className="write-css">
                        <h1 className="write-form-title">{this.props.board} Write</h1>
                        <form onSubmit={this.writeSubmit}>
                        <table className="write-table">
                            <thead>
                                <tr>
                                    <th className="write-table-th">Category</th>
                                    <td className="write-table-td">
                                        {frontCategory}
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th className="write-table-th">Title</th>
                                <td className="write-table-td">
                                    <input 
                                        type="text"
                                        className="write-table-input"
                                        value={this.state.title}
                                        onChange={this.updateInput}
                                        name="title"
                                        required/>
                                </td>   
                            </tr>
                            <tr>    
                                <th className="write-table-th"> Contents </th>
                                <td colSpan="2">
                                    <textarea 
                                        rows="17"
                                        cols="50"
                                        className="write-table-textarea"
                                        value={this.state.contents}
                                        onChange={this.updateInput}
                                        name="contents"></textarea>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <p className="write-ment">
                        {   
                            this.state.isCategory && "카테고리를 선택하여 주세요."
                        }  
                        </p>
                        <button 
                            type="submit"    
                            className="write-ok-btn">
                            Write
                        </button>
                        <button 
                            type="button"
                            className="write-cancel-btn"
                            onClick={this.cancel}>
                            Cancel    
                        </button>
                        </form>
                        <section>
                        <Modal visible={this.state.isWriteSuccess} width="400" height="300" effect="fadeInUp">
                            <div>
                                <h1 className="modal-title">글작성 성공</h1>
                                <Link to="/front" className="write-modalLink"><p className="write-link-ment">게시판으로 이동하시겠습니까?</p></Link>
                            </div>
                        </Modal>
                        </section>
                    </div>
                )
            }else {
                return(
                    <div className="write-css">
                        <h1 className="write-form-title">{this.props.board} Write</h1>
                        <form onSubmit={this.writeSubmit}>
                        <table className="write-table">
                            <thead>
                                <tr>
                                    <th className="write-table-th">Category</th>
                                    <td className="write-table-td">
                                        {this.state.choiceBoard === '2' ? backCategory : commonCategory}
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>    
                                <th className="write-table-th">Title</th>
                                <td className="write-table-td">
                                    <input 
                                        type="text"
                                        className="write-table-input"
                                        value={this.state.title}
                                        onChange={this.updateInput}
                                        name="title"
                                        required/>
                                </td>   
                            </tr>
                            <tr>    
                                <th className="write-table-th"> Contents </th>
                                <td colSpan="2">
                                    <textarea 
                                        rows="17"
                                        cols="50"
                                        className="write-table-textarea"
                                        value={this.state.contents}
                                        onChange={this.updateInput}
                                        name="contents"></textarea>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <p className="write-ment">
                        {   
                            this.state.isCategory && "카테고리를 선택하여 주세요."
                        }  
                        </p>
                        <button 
                            type="submit"    
                            className="write-ok-btn">
                            Write
                        </button>
                        <button 
                            type="button"
                            className="write-cancel-btn"
                            onClick={this.cancel}>
                            Cancel    
                        </button>
                        </form>
                        <section>
                        <Modal visible={this.state.isWriteSuccess} width="400" height="300" effect="fadeInUp">
                            <div>
                                <h1 className="modal-title">글작성 성공</h1>
                                {/* front게시판인지 back게시판인지 확인하고 링크걸기 */}
                                {this.state.choiceBoard ==='2'?
                                    <Link to="/back" className="write-modalLink"><p className="write-link-ment">게시판으로 이동하시겠습니까?</p></Link> :
                                    <Link to="/common" className="write-modalLink"><p className="write-link-ment">게시판으로 이동하시겠습니까?</p></Link>}
                            </div>
                        </Modal>
                        </section>
                    </div>
                )
            }
        }
    }
}

WriteView.propTypes = {
    board : PropTypes.string,
    onWrite : PropTypes.func
};

WriteView.defaultTypes = {
    board : '',
    onWrite : () => {console.error("write function not defined");}
}

export default WriteView;
