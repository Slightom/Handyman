import * as types from '../actions/actionTypes'
import appReducer from './appReducer';
import initialState from './initialState';

const rootReducer = (state, action) => {
    if (action.type === types.USER_LOGOUT) {
        state = initialState;
    }

    return appReducer(state, action);
};

export default rootReducer;