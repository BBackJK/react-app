import React from 'react';

import { FindAccountView , Title } from '../../components';

class FindAccount extends React.Component {
    render() {
        return (
            <div>
            <Title/>
            <FindAccountView/>
            </div>
        );
    }
}

export default FindAccount;
