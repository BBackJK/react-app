import React from 'react';
import { connect } from 'react-redux';

import { BoardView , Title , NavBar } from '../../components';
import { boardListRequest } from '../../actions/board';
import storage from '../../lib/storage';

class Common extends React.Component{
    constructor() {
        super()
        this.state = {
            isLogged : false
        };
    };

    componentDidMount() {

        if(storage.get('loggedUser') != null) {
            this.setState({
                isLogged : true
            });
        }

        this.props.boardListRequest('common').then(
            () => {
                console.log(this.props.status.data);
                if(this.props.status.data[0] == null) {
                    //데이터가 하나도 없을때 구분.
                    console.log("값이 없다");
                }
            }
        );
    };

    render() {
        return (
            <div className="back-css">
                <Title/>
                <NavBar isLogged={this.state.isLogged}/>
                <BoardView mode={"3"}
                            list={this.props.status.data}/>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        status : state.board.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        boardListRequest : (div) => {
            return dispatch(boardListRequest(div));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Common);
