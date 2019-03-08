import React from 'react';
import { connect } from 'react-redux';

import { PostView , Title , NavBar } from '../../components';
import storage from '../../lib/storage';

class Post extends React.Component {
    constructor(props) {
        super(props);
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
    }

    render() {
        //this.props.posts는 store(reduce)에 저장되어있는 list. 그안에 data를 가져왔고,
        //seq를 파라미터로 전송받아 seq로 reduce에서 가져온 데이터들을 구별할때 사용.(this.props.match.params.seq)
        const clickPost = this.props.posts.data[this.props.match.params.seq-1];
        return(
            <div>
                <Title/>
                <NavBar isLogged={this.state.isLogged}/>
                <PostView post={clickPost}
                          mode={this.props.match.params.mode}/>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        posts : state.board.list
    };
};

export default connect(mapStateToProps)(Post);
