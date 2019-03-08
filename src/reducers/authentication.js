// 액션폴더에 있는 액션 메소드에서 변경한
// 상태를 받아 기존의 상태를 새로운 상태로 변경하는 일
import * as types from '../actions/actionTypes';    
import update from 'react-addons-update';

const initialState = {
    login : {
        status : 'INIT'
    },
    signUp : {
        status : 'INIT',
        error : ''
    },
    find : {
        emailStatus : 'INIT',
        pwStatus : 'INIT',
        email : '',
        password : ''
    },
    update : {
        status : 'INIT',
        error : ''
    },
    delete : {
        status : 'INIT'
    },
    status : {
        valid : false, //getStatus에 대한 초기state status값.
        isLoggedIn : false,
        userEmail : ''
    }
};

export default function authentication(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {

        /**login status reduce */
        case types.AUTH_LOGIN:
            //action type이 auth_login이라면 initialstate에 있는 login status를 waiting으로 변경하라
            return update(state, {
                login : {
                    status : { $set : 'WAITING'}
                }
            });
        
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login : {
                    status : { $set : 'SUCCESS' }
                },
                status : {
                    isLoggedIn : { $set : true },
                    userEmail : { $set : action.email }
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login : {
                    status : { $set : 'FAILURE' }
                }
            });

        /** sign up reduce */
        case types.AUTH_SIGN_UP:
            return update(state, {
                signUp : {
                    status : { $set : 'WAITING' }
                }
            });

        case types.AUTH_SIGN_UP_SUCCESS:
            return update(state, {
                signUp : {
                    status : { $set : 'SUCCESS' },
                    error : { $set : '' }
                }
            });

        case types.AUTH_SIGN_UP_FAILURE:
            return update(state, {
                signUp : {
                    status : { $set : 'FAILURE' },
                    error : { $set : action.error }
                }
            });
        
        /** find info reduce */
        case types.AUTH_FIND_EMAIL:
            return update(state, {
                find : {
                    emailStatus : { $set : 'WAITING' }
                }
            });

        case types.AUTH_FIND_EMAIL_SUCCESS:
            return update(state, {
                find : {
                    emailStatus : { $set : 'SUCCESS' },
                    email : { $set : action.email}
                }
            });

        case types.AUTH_FIND_EMAIL_FAILURE:
            return update(state, {
                find : {
                    emailStatus : { $set : 'FAILURE' }
                }
            });

        case types.AUTH_FIND_PW :
            return update(state, {
                find : {
                    pwStatus : { $set : 'WAITING' }
                }
            });

        case types.AUTH_FIND_PW_SUCCESS :
            return update(state, {
                find : {
                    pwStatus : { $set : 'SUCCESS' },
                    password : { $set : action.password }
                }
            });

        case types.AUTH_FIND_PW_FAILURE : 
            return update(state, {
                find : {
                    pwStatus : { $set : 'FAILURE' }
                }
            });
            
        /**Get Status Info reduce */
        case types.AUTH_GET_STATUS:
            return update(state, {
                status : {
                    isLoggedIn : { $set : true }
                }
            });
        
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                status : {
                    valid : { $set : true }
                }
            });
        
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                status : {
                    valid : { $set : false },
                    isLoggedIn : { $set : false }
                }
            });
            
        /** LOGOUT REDUCE */
        case types.AUTH_LOGOUT:
            return update(state, {
                status : {
                    valid : { $set : false },
                    isLoggedIn : { $set : false },
                    userEmail : { $set : ''}
                }
            });

        /** UPDATE USER INFO REDUCE */
        case types.AUTH_STATUS_UPDATE:
            return update(state, {
                update : {
                    status : { $set : 'WAITING'}
                }
            });

        case types.AUTH_STATUS_UPDATE_SUCCESS:
            return update(state, {
                update : {
                    status : { $set : 'SUCCESS'}
                }
            });

        case types.AUTH_STATUS_UPDATE_FAILURE:
            return update(state, {
                update : {
                    status : { $set : 'FAILURE'},
                    error : { $set : action.error }
                }
            });

        /** DELETE USER INFO REDUCE */
        case types.AUTH_STATUS_DELETE:
            return update(state, {
                delete : {
                    status : { $set : 'WAITING'}
                }
            });

        case types.AUTH_STATUS_DELETE_SUCCESS:
            return update(state, {
                delete : {
                    status : { $set : 'SUCCESS' }
                },
                status : {
                    valid: { $set : false },
                    isLoggedIn : { $set : false },
                    userEmail : { $set : ''}
                }
            });

        case types.AUTH_STATUS_DELETE_FAILURE:
            return update(state, {
                delete : {
                    status : { $set : 'FAILURE'}
                }
            });

        /** DEFAULT */
        default:
            // console.log("in reducer`s state : " , state);
            return state;
    }
}
