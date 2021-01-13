import * as types from "./actionTypes";
import * as formApi from "../../api/formApi";

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

export function saveForm(form) {
    return function (dispatch) {
        return formApi
            .saveForm(form)
            .then(savedForm => {
                form.id
                    ? dispatch(updateFormSuccess(savedForm))
                    : dispatch(createFormSuccess(savedForm))
            })
            .catch(error => {
                throw error;
            });
    }
}