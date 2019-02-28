import React from 'react';
import PropTypes from 'prop-types';

import storage from '../../lib/storage';
import './CheckPWView.css';

class CheckPWView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ment : ''
        };

        this.updateInput = this.updateInput.bind(this);
    };

    updateInput = (e) => {
        if(storage.get('userInfo').password === e.target.value) {
            this.props.checkingPW(true);
        }else {
            this.setState({
                ment : '비밀번호가 일치하지 않습니다.'
            });
        };
    }

    render() {
        return (
            <div className="checkpw-css">
                <h2>Check your password.</h2>
                <input 
                    type="password"
                    className="checkpw-input"
                    onChange={this.updateInput}
                    value={this.state.check_pw}/>
                <p className="checkpw-ment">{this.state.ment}</p>
            </div>
        );
    };
};

CheckPWView.propTypes = {
    checkingPW : PropTypes.func
};

CheckPWView.defaultTypes = {
    checkingPW : (check) => {console.error("checkingPW function not defined");}
};

export default CheckPWView;
