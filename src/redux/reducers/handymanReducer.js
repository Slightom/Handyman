import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function handymanReducer(state = initialState.handymans, action) {
    switch (action.type) {
        case types.LOAD_HANDYMANS_SUCCESS:
            return action.handymans;
        default:
            return state;
    }
}