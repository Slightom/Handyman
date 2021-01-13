import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function formReducer(state = initialState.forms, action) {
    switch (action.type) {
        case types.CREATE_FORM:
            return [...state, action.form];
        case types.LOAD_FORMS_SUCCESS:
            return action.forms;
        case types.CREATE_FORM_SUCCESS:
            return [...state, action.form];
        case types.UPDATE_FORM_SUCCESS:
            return state.map(form => form.id === action.form.id ? action.form : form);
        default:
            return state;
    }
}