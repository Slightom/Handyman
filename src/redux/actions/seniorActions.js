import * as types from "./actionTypes";
import * as seniorApi from "../../api/seniorApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadSeniorsSuccess(seniors) {
    return { type: types.LOAD_SENIORS_SUCCESS, seniors };
}

// export function createSenior(senior) {
//     return { type: types.CREATE_FORM, form };
// }

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