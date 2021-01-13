import * as types from "./actionTypes";
import * as formApi from "../../api/formApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadFormsSuccess(forms) {
    return { type: types.LOAD_FORMS_SUCCESS, forms };
}

export function createFormSuccess(form) {
    return { type: types.CREATE_FORM_SUCCESS, form };
}

export function updateFormSuccess(form) {
    return { type: types.UPDATE_FORM_SUCCESS, form };
}

export function loadForms() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return formApi
            .getForms()
            .then(forms => {
                dispatch(loadFormsSuccess(forms));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}

export function saveForm(form) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return formApi
            .saveForm(form)
            .then(savedForm => {
                form.id
                    ? dispatch(updateFormSuccess(savedForm))
                    : dispatch(createFormSuccess(savedForm))
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}