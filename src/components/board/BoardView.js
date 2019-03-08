import React from 'react';
import PropTypes from 'prop-types';
import { Link , Redirect } from 'react-router-dom';

import { FriendBarView } from '../index';
import './BoardView.css';

class BoardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClick : false,
            seq : Number
        };
        this.click = this.click.bind(this);
    };

    componentWillUnmount() {
        document.removeEventListener("unmount",this.click);
    }

    click(seq) {
        this.setState({
            isClick : true,
            seq : seq
        });
    };

    render() {
        const boardList = this.props.list;
    
        const listView = boardList.map((boardList) =>
            <tbody key={boardList.seq}>
                    <tr onClick={()=>this.click(boardList.seq)} className="board-tr">
                        <td className="board-td">{boardList.category}</td>
                        <td className="board-td">{boardList.title}</td>
                        <td className="board-td">{boardList.user_name}</td>
                        <td className="board-td">{boardList.reg_date}</td>
                    </tr>
            </tbody>
        );

        const emptyListView = (
            <tbody className="empty-tbody">
                <tr>
                    <td colSpan="4" 
                        align="center">작성한 글이 없습니다.</td>
                </tr>
            </tbody>
        )

        const frontView = (
            <div className="board-css">
                <div className="left-main">
                <h2>Front Board</h2>
                    <table className="board-table">
                        <thead className="board-thead">
                            <tr>
                                <th scope="cols" className="board-th">카테고리</th>
                                <th scope="cols" className="board-th">제목</th>
                                <th scope="cols" className="board-th">작성자</th>
                                <th scope="cols" className="board-th">등록일</th>
                            </tr>
                        </thead>
                        {
                            (boardList[0]==null) ? emptyListView : listView
                        }
                    </table>
                    <button 
                        type="button"
                        className="write-btn">
                    <Link to="/write/Front"
                        className="write-link">
                        Write    
                    </Link>
                    </button>
                </div>
                <div className="right-side">
                    <FriendBarView/>
                </div>
            </div>
        );

        const backView = (
            <div className="board-css">
                <div className="left-main">
                <h2>Back Board</h2>
                    <table className="board-table">
                        <thead className="board-thead">
                            <tr>
                                <th scope="cols" className="board-th">카테고리</th>
                                <th scope="cols" className="board-th">제목</th>
                                <th scope="cols" className="board-th">작성자</th>
                                <th scope="cols" className="board-th">등록일</th>
                            </tr>
                        </thead>
                        {   
                            (boardList[0]==null) ? emptyListView : listView
                        }
                    </table>
                    <button 
                        type="button"
                        className="write-btn">
                    <Link to="/write/Back"
                        className="write-link">
                        Write    
                    </Link>
                    </button>
                </div>
                <div className="right-side">
                    <FriendBarView/>
                </div>
            </div>
        );

        const commonView = (
            <div className="board-css">
                <div className="left-main">
                <h2>Common Board</h2>
                    <table className="board-table">
                        <thead className="board-thead">
                            <tr>
                                <th scope="cols" className="board-th">카테고리</th>
                                <th scope="cols" className="board-th">제목</th>
                                <th scope="cols" className="board-th">작성자</th>
                                <th scope="cols" className="board-th">등록일</th>
                            </tr>
                        </thead>
                        {
                            (boardList[0]==null) ? emptyListView : listView
                        }
                    </table>    
                    <button 
                        type="button"
                        className="write-btn">
                    <Link to="/write/Common"
                        className="write-link">
                        Write    
                    </Link>
                    </button>
                </div>
                <div className="right-side">
                    <FriendBarView/>
                </div>
            </div>
        );

        if(!this.state.isClick) {
            if (this.props.mode === "1") {
                return frontView;
            }else if(this.props.mode === "2") {
                return backView;
            }else if(this.props.mode === "3") {
                return commonView;
            }
        } else {
            return <Redirect to={`/post/${this.state.seq}/${this.props.mode}`} />
        }
    };
};

BoardView.propTypes = {
    mode : PropTypes.string,
    list : PropTypes.array
};

BoardView.defaultTypes = {
    mode : '',
    list : []
};

export default BoardView;
