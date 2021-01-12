import * as types from "../actions/actionTypes";

export default function formReducer(state = [], action) {
    switch (action.type) {
        case types.CREATE_FORM:
            return [...state, action.form];
        default:
            return state;
    }
}