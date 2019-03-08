import React from 'react';
import { connect } from 'react-redux';

import { Title , WriteView } from '../../components';
import { writeRequest } from '../../actions/board';

import storage from '../../lib/storage';

class Write extends React.Component {
    constructor(props) {
        super(props);
        this.writeSubmit = this.writeSubmit.bind(this);
    }

    componentWillMount() {
        if(storage.get('userInfo') != null) {
            console.log(storage.get('userInfo').email);
        }
        
    }

    writeSubmit(writeData) {
        return this.props.writeRequest(writeData).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    console.log('글작성 성공!');
                    return true;
                }else {
                    console.log("글작성 실패");
                    return false;
                }
            }
        )

    }

    render() {
        return(
            <div>
                <Title/>
                <WriteView onWrite={this.writeSubmit}
                            board={this.props.match.params.board}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status : state.board.write.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        writeRequest : (writeData) => {
            return dispatch(writeRequest(writeData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Write);
