import React from 'react';
import { bubble as Menu } from 'react-burger-menu';

import friends from '../../img/friends.png'
import './FriendBarView.css';

class FriendBarView extends React.Component {
    render() {
        return (
            <div className="friend-css">
            <Menu right
                customBurgerIcon = { <img src={friends}/>}>
                <li>
                    관리자
                </li>
                <li>
                    빌리진
                </li>
                <li>
                    테스트1
                </li>
                <li>
                    테스트2
                </li>
            </Menu>
            </div>
        );
    };
};

export default FriendBarView;
