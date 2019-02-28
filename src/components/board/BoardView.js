import React from 'react';
import PropTypes from 'prop-types';
import { Link , Redirect } from 'react-router-dom';

import './BoardView.css';

class BoardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClick : false,
            // boardMode : '',
            seq : Number
        };
        this.click = this.click.bind(this);
    };

    componentWillMount() {
        console.log(this.props.mode);
        // if(this.props.mode === "1") {
        //     console.log("mode 1");
        //     this.setState({
        //         boardMode : '1'
        //     });
        // }else if(this.props.mode === "2") {
        //     console.log("mode 2");
        //     this.setState({
        //         boardMode : '2'
        //     });
        // }else if(this.props.mode === "3") {
        //     console.log("mode 3");
        //     this.setState({
        //         boardMode : '3'
        //     })
        // }
    };

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
        );

        const backView = (
            <div className="board-css">
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
        );

        const commonView = (
            <div className="board-css">
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
        );

        if(!this.state.isClick) {
            // switch(this.props.mode) {
            //     case "1":
            //         return frontView;
            //     case "2":
            //         return backView;
            //     case "3":
            //         return commonView;
            //     default:
            //         return window.history.back();
            // }
            if (this.props.mode === "1") {
                return frontView;
            }else if(this.props.mode === "2") {
                return backView;
            }else if(this.props.mode === "3") {
                return commonView;
            }
        } else {
            return <Redirect to={`/post/${this.state.seq}`} />
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
