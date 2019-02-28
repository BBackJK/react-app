import authentication from './authentication';
import board from './board';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    board
});
