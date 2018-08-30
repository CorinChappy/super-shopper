import * as types from './ActionTypes';
import * as requests from '../api/authRequests'


export function sendingLoginRequest(){
    return {
        type: "REQUEST_PENDING"
    }
}


export function successfulLogin(response){
    return {
        type: types.LOGIN_ACTION_SUCCESS,
        payload: {
            username: response.user.username,
            ID: response.user.ID,
            token: response.token
        } 
    }
}


export function unsuccessfulLogin(response){
    return {
        type: types.LOGIN_ACTION_FAIL,
                payload: {
                    none: "nada"
                }
    }
}

export function logout(){
    return {
        type: types.LOGOUT_ACTION,
        payload: null
    }
}


export function attemptLogin(username, password){
    return (dispatch) => {
        requests.performLoginRequest(username, password)
        .then((response) => {
              dispatch(successfulLogin(response));
        })
        .catch((err) => {
             dispatch(unsuccessfulLogin(err));
        })
    }
}


