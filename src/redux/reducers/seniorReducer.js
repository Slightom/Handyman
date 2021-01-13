import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function seniorReducer(state = initialState.seniors, action) {
    switch (action.type) {
        case types.LOAD_SENIORS_SUCCESS:
            return action.seniors;
        case types.CREATE_SENIOR_SUCCESS:
            return [...state, action.senior];
        case types.UPDATE_SENIOR_SUCCESS:
            return state.map(senior => senior.id === action.senior.id ? action.senior : senior);
        case types.DELETE_SENIOR_OPTIMISTIC:
            return state.filter(senior => senior.id !== action.senior.id);
        default:
            return state;
    }
}