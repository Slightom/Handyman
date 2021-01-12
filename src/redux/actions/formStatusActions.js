import * as types from "./actionTypes";
import * as formStatusApi from "../../api/formStatusApi";

export function loadFormStatusesSuccess(formStatuses) {
    return { type: types.LOAD_FORMSTATUSES_SUCCESS, formStatuses };
}

// export function createSenior(senior) {
//     return { type: types.CREATE_FORM, form };
// }

export function loadFormStatuses() {
    return function (dispatch) {
        return formStatusApi
            .getFormStatuses()
            .then(formStatuses => {
                dispatch(loadFormStatusesSuccess(formStatuses));
            })
            .catch(error => {
                throw error;
            });
    }
}