import React from 'react';

import { Title } from '../../containers';

import './Write.css';

class Write extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category : '',
            title : '',
            contents : '',
            onWrite : false
        };

        this.writeSubmit = this.writeSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    writeSubmit = (e) => {
        e.preventDefault();
        const writeData = {
            category : this.state.category,
            title : this.state.title,
            contents : this.state.contents
        }

        console.log(writeData);
        if(writeData.category === '' ) {
            this.setState({
                onWrite : true
            })
        }else {
            this.setState({
                onWrite : false
            })
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
        return(
            <div className="write-css">
            <Title/>
                <h1 className="write-form-title">Write</h1>
                <form onSubmit={this.writeSubmit}>
                <table className="write-table">
                    <thead>
                        <tr>
                            <th className="write-table-th">Category</th>
                            <td className="write-table-td">
                                <select 
                                    name="category"
                                    value={this.state.category}
                                    onChange={this.updateInput}>
                                    <option value="">Select Category</option>
                                    <option value="react">React</option>
                                    <option value="angular">Angular</option>
                                    <option value="vue">Vue</option>
                                    <option value="html">Html</option>
                                    <option value="css">CSS</option>
                                </select>
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
                    <tr>
                        <th>File</th>
                        <td className="write-table-td">
                            <input 
                                type="file"
                                name="file"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p className="write-ment">
                {
                    this.state.onWrite && "카테고리를 선택하여 주세요."
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
            </div>
        )
    }
}

export default Write;
