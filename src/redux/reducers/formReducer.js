import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function formReducer(state = initialState.forms, action) {
    switch (action.type) {
        case types.LOAD_FORMS_SUCCESS:
            return action.forms;
        case types.CREATE_FORM_SUCCESS:
            return [...state, action.form];
        case types.UPDATE_FORM_SUCCESS:
            return state.map(form => form.id === action.form.id ? action.form : form);
        case types.DELETE_FORM_OPTIMISTIC:
            return state.filter(form => form.id !== action.form.id);
        default:
            return state;
    }
}