// 액션폴더에 있는 액션 메소드에서 변경한
// 상태를 받아 기존의 상태를 새로운 상태로 변경하는 일
import * as types from '../actions/actionTypes';    
import update from 'react-addons-update';

const initialState = {
    write : {
        status : 'INIT'
    },
    list : {
        status : 'INIT',
        data : []
    }
};

export default function board(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    /**board write reduce*/
    switch(action.type) {
        case types.BOARD_WRITE:
            return update(state, {
                write : {
                    status : { $set : 'WAITING' }
                }
            });
        
        case types.BOARD_WRITE_SUCCESS:
            return update(state, {
                write : {
                    status : { $set : 'SUCCESS' }
                }
            });
        
        case types.BOARD_WRITE_FAILURE:
            return update(state, {
                write : {
                    status : { $set : 'FAILURE' }
                }
            });

        /* board get list reduce */
        case types.BOARD_GET_LIST:
            return update(state, {
                list : {
                    status : { $set : 'WAITING' }
                }
            });

        case types.BOARD_GET_LIST_SUCCESS:
            return update(state, {
                list : {
                    status : { $set : 'SUCCESS' },
                    data : { $set : action.data }
                }
            })

        case types.BOARD_GET_LIST_FAILURE:
            return update(state, {
                list : {
                    status : { $set : 'FAILURE' }
                }
            })
            
        /** DEFAULT */
        default:
            // console.log("in reducer`s state : " , state);
            return state;
    }
}
