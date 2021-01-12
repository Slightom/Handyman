import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function formReducer(state = initialState.forms, action) {
    switch (action.type) {
        case types.CREATE_FORM:
            return [...state, action.form];
        case types.LOAD_FORMS_SUCCESS:
            return action.forms;
        default:
            return state;
    }
}