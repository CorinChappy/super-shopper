import * as types from '../actions/ActionTypes';
import initialState from './initialState';



export default function authReducer(state=initialState, action){
    switch(action.type){
        case types.LOGIN_ACTION_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                ID: action.payload.ID,
                token: action.payload.token
                
            };
        case types.PERFORM_SIGNUP_ACTION:
            return state;
        case types.LOGIN_ACTION_FAIL:
            return state;
        case types.LOGOUT_ACTION:
            return initialState;
        default:
            return state;
    }
    
}


