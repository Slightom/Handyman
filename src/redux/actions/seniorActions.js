import * as types from "./actionTypes";
import * as seniorApi from "../../api/seniorApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadSeniorsSuccess(seniors) {
    return { type: types.LOAD_SENIORS_SUCCESS, seniors };
}

export function createSeniorSuccess(senior) {
    return { type: types.CREATE_SENIOR_SUCCESS, senior };
}

export function updateSeniorSuccess(senior) {
    return { type: types.UPDATE_SENIOR_SUCCESS, senior };
}

export function deleteSeniorOptimistic(senior) {
    return { type: types.DELETE_SENIOR_OPTIMISTIC, senior };
}


export function saveSenior(senior) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return seniorApi
            .saveSenior(senior)
            .then(savedSenior => {
                senior.id
                    ? dispatch(updateSeniorSuccess(savedSenior))
                    : dispatch(createSeniorSuccess(savedSenior))
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}

export function loadSeniors() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return seniorApi
            .getSeniors()
            .then(seniors => {
                dispatch(loadSeniorsSuccess(seniors));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}

export function deleteSenior(senior) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        dispatch(deleteSeniorOptimistic(senior));
        return seniorApi.deleteSenior(senior.id);
    };
}