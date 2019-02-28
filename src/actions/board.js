import axios from 'axios';

import * as types from './actionTypes';

/**
 * board write action method
 */
export function writeRequest(writeData) {
    return (dispatch) => {
        dispatch(write());

        return axios.post('http://localhost:5000/board-write',writeData)
            .then((res) => {
                console.log(res);
                dispatch(writeSuccess());
            })
            .catch((err) => {
                console.log(err);
                dispatch(writeFailure());
            })
    };
};

export function write() {
    return {
        type : types.BOARD_WRITE
    };
}

export function writeSuccess() {
    return {
        type : types.BOARD_WRITE_SUCCESS
    };
}

export function writeFailure() {
    return {
        type : types.BOARD_WRITE_FAILURE
    };
}

/**
 * board get list action method
 */
export function boardListRequest(div) {
    return (dispatch) => {
        dispatch(boardList());

        return axios.get('http://localhost:5000/board-list/'+div)
        .then((res) => {
            console.log(res);
            dispatch(boardListSuccess(res.data));
        })
        .catch((err) => {
            console.log(err);
            dispatch(boardListFailure());
        })
    }
};

export function boardList() {
    return {
        type : types.BOARD_GET_LIST
    };
};

export function boardListSuccess(data) {
    return {
        type : types.BOARD_GET_LIST_SUCCESS,
        data
    };
};

export function boardListFailure() {
    return {
        type : types.BOARD_GET_LIST_FAILURE
    };
};
