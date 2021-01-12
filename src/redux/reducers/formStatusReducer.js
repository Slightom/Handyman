import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function seniorReducer(state = initialState.formStatuses, action) {
    switch (action.type) {
        case types.LOAD_FORMSTATUSES_SUCCESS:
            return action.formStatuses;
        default:
            return state;
    }
}