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
                console.log("actions`s axios success email:" + email);
                dispatch(loginSuccess(email));
            })
            .catch((err) => {
                dispatch(loginFailure());
                console.log("loginFail");
            })
    };
}

export function login() {
    return {
        // type : AUTH_LOGIN
        type: types.AUTH_LOGIN
    };
}

export function loginSuccess(email) {
    return {
        // type : AUTH_LOGIN_SUCCESS,
        type : types.AUTH_LOGIN_SUCCESS,
        email
    };
}

export function loginFailure() {
    return {
        // type : AUTH_LOGIN_FAILURE
        type : types.AUTH_GET_STATUS_FAILURE
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
        // type: AUTH_GET_STATUS
        type: types.AUTH_GET_STATUS
    };
}

export function getStatusSuccess() {
    return {
        // type : AUTH_GET_STATUS_SUCCESS,
        type : types.AUTH_GET_STATUS_SUCCESS
    };
}

export function getStatusFailure() {
    return {
        type : types.AUTH_GET_STATUS_FAILURE
        // type : AUTH_GET_STATUS_FAILURE
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
                console.log(res);
                dispatch(updateSuccess());
            })
            .catch((err) => {
                console.log(err);
                dispatch(updateFailure());
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

export function updateFailure() {
    return {
        type : types.AUTH_GET_STATUS_FAILURE
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
