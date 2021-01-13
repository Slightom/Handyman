import * as types from "./actionTypes";
import * as handymanApi from "../../api/handymanApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadHandymansSuccess(handymans) {
    return { type: types.LOAD_HANDYMANS_SUCCESS, handymans };
}

// export function createSenior(senior) {
//     return { type: types.CREATE_FORM, form };
// }

export function loadHandymans() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return handymanApi
            .getHandymans()
            .then(handymans => {
                dispatch(loadHandymansSuccess(handymans));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}