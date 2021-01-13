import * as types from "./actionTypes";
import * as formStatusApi from "../../api/formStatusApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadFormStatusesSuccess(formStatuses) {
    return { type: types.LOAD_FORMSTATUSES_SUCCESS, formStatuses };
}

// export function createSenior(senior) {
//     return { type: types.CREATE_FORM, form };
// }

export function loadFormStatuses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return formStatusApi
            .getFormStatuses()
            .then(formStatuses => {
                dispatch(loadFormStatusesSuccess(formStatuses));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}