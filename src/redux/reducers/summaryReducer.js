import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function summaryReducer(state = initialState.summaryRows, action) {
    switch (action.type) {
        case types.GET_SUMMARY_ROWS:
            return state;
        case types.SET_SUMMARY_ROWS:
            return action.summaryRows;
        default:
            return state;
    }
}