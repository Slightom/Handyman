import * as types from "./actionTypes";
import * as formApi from "../../api/formApi";

export function loadFormsSuccess(forms) {
    return { type: types.LOAD_FORMS_SUCCESS, forms };
}

export function createForm(form) {
    return { type: types.CREATE_FORM, form };
}

export function loadForms() {
    return function (dispatch) {
        return formApi
            .getForms()
            .then(forms => {
                dispatch(loadFormsSuccess(forms));
            })
            .catch(error => {
                throw error;
            });
    }
}