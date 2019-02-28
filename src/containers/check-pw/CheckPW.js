import React from 'react';
import { Redirect } from 'react-router-dom';

import './CheckPW.css';
import storage from '../../lib/storage';

class CheckPW extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checking : false
        };

        this.updateInput = this.updateInput.bind(this);
    };

    updateInput = (e) => {
        if(storage.get('userInfo').password === e.target.value) {
            this.setState({
                checking : true
            });
        }
    }

    render() {
        return (
            <div className="checkpw-css">
                <p>check your password.</p>
                <input 
                    type="password"
                    className="checkpw-input"
                    onChange={this.updateInput}
                    value={this.state.check_pw}/>
                {
                    this.state.checking && <Redirect to={"/".concat(this.props.match.params.url)}/>
                }
            </div>
        );
    };
}

export default CheckPW;
