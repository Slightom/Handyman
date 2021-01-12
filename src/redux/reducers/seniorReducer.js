import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function seniorReducer(state = initialState.seniors, action) {
    switch (action.type) {
        case types.LOAD_SENIORS_SUCCESS:
            return action.seniors;
        default:
            return state;
    }
}