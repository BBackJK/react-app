import React from 'react';
import { connect } from 'react-redux';

import { BoardView , Title , NavBar } from '../../components';
import { boardListRequest } from '../../actions/board';
import storage from '../../lib/storage';


class Front extends React.Component {
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

        this.props.boardListRequest('front').then(
            () => {
                console.log(this.props.status.data);
            }
        );
    };

    render() {
        return (
            <div>
                <Title/>
                <NavBar isLogged={this.state.isLogged}/>
                <BoardView mode={"1"}
                            list={this.props.status.data}/>
            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Front);
