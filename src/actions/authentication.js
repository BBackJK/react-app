import axios from 'axios';

//action types
import * as types from './actionTypes';
import storage from '../lib/storage';

/**
 * login Action method
 */
export function loginRequest(email, pw) {
    return (dispatch) => {
        dispatch(login());

        return axios.post('http://localhost:5000/login',{email, pw})
            .then((res) => {
                console.log(res);
                dispatch(loginSuccess(email));
            })
            .catch((err) => {
                console.log(err);
                dispatch(loginFailure());
            })
    };
}

export function login() {
    return {
        type: types.AUTH_LOGIN
    };
}

export function loginSuccess(email) {
    return {
        type : types.AUTH_LOGIN_SUCCESS,
        email
    };
}

export function loginFailure() {
    return {
        type : types.AUTH_GET_STATUS_FAILURE
    };
}

/**
 * sign up action method
 */
export function signUpRequest(signUpData) {
    return (dispatch) => {
        dispatch(signUp());

        return axios.post('http://localhost:5000/sign-up',signUpData)
            .then((res) => {
                dispatch(signUpSuccess());
            })
            .catch((err) => {
                dispatch(signUpFailure(err.response.data));
            });
    };
}

export function signUp() {
    return {
        type : types.AUTH_SIGN_UP
    };
}

export function signUpSuccess() {
    return {
        type : types.AUTH_SIGN_UP_SUCCESS
    };
}

export function signUpFailure(error) {
    return {
        type : types.AUTH_SIGN_UP_FAILURE,
        error
    };
}

/**
 * getStatus Action Method
 */

export function getStatusRequest(email) {
     return (dispatch) => {
        dispatch(getStatus());
        return axios.get('http://localhost:5000/getInfo/'+ email)
        .then((res) => {
            console.log(res.data[0]);
            //mypage에서 사용할 userInfo 세션에 저장.
            storage.set('userInfo',res.data[0]);
            dispatch(getStatusSuccess());
        })
        .catch((err) => {
            dispatch(getStatusFailure());
            console.log("getStatusFail..error:",err);
        })
    }
}

export function getStatus() {
    return {
        type: types.AUTH_GET_STATUS
    };
}

export function getStatusSuccess() {
    return {
        type : types.AUTH_GET_STATUS_SUCCESS
    };
}

export function getStatusFailure() {
    return {
        type : types.AUTH_GET_STATUS_FAILURE
    };
}

/**
 * logout action method
 */
export function logoutRequest() {
    return(dispatch) => {
        return axios.get('http://localhost:5000/logout')
        .then(() => {
            dispatch(logout());
        });
    }
}

export function logout() {
    console.log("action method logout이다 이새꺄");
    return {
        // type : AUTH_LOGOUT
        type : types.AUTH_LOGOUT
    };
}

/**
 * update action method
 */
export function updateRequest(updateData) {
    return (dispatch) => {

        dispatch(update());

        return axios.post('http://localhost:5000/update-info',updateData)
            .then((res) => {
                console.log("update :",res);
                dispatch(updateSuccess());
            })
            .catch((err) => {
                console.log("update :", err);
                dispatch(updateFailure(err.response.data));
            })
    }
}

export function update() {
    return {
        type : types.AUTH_STATUS_UPDATE
    };
}

export function updateSuccess() {
    return {
        type : types.AUTH_STATUS_UPDATE_SUCCESS
    };
}

export function updateFailure(error) {
    return {
        type : types.AUTH_STATUS_UPDATE_FAILURE,
        error
    };
}

/**
 *  delete account action method
 */
export function deleteRequest(email) {
    return (dispatch) => {
        dispatch(deleteUser());
    
        return axios.get('http://localhost:5000/delete-info/'+email)
            .then((res) => {
                console.log(res);
                dispatch(deleteUserSuccess());
            })
            .catch((err) => {
                console.log(err);
                dispatch(deleteUserFailure());
            })
    };
}

export function deleteUser() {
    return {
        type : types.AUTH_STATUS_DELETE
    };
}

export function deleteUserSuccess() {
    return {
        type : types.AUTH_STATUS_DELETE_SUCCESS
    };
}

export function deleteUserFailure() {
    return {
        type : types.AUTH_STATUS_UPDATE_FAILURE
    };
}
