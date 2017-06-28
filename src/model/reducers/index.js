import { combineReducers } from 'redux';
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions';

export let initialState = {
    entities: {
        loginUser: null
    },
    loginPageData: {
        loading: false,
        error: null
    }
};

let reducers = combineReducers({
    entities: function(state = {}, action) {
        switch(action.type) {
            case LOGIN_SUCCESS:
            return {...state, loginUser: action.payload};
        default:
            return state;
        }
    },
    loginPageData: function(state = {}, action) {
        switch(action.type) {
            case LOGIN_LOADING:
                return {...state, loading: action.payload};
            case LOGIN_FAILURE:
                return {...state, error: action.payload};
            case LOGIN_SUCCESS:
                return {...state, error: null};
            default:
                return state;
        }
    }
});

export default reducers;
