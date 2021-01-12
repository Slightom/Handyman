import * as types from "./actionTypes";
import * as seniorApi from "../../api/seniorApi";

export function loadSeniorsSuccess(seniors) {
    return { type: types.LOAD_SENIORS_SUCCESS, seniors };
}

// export function createSenior(senior) {
//     return { type: types.CREATE_FORM, form };
// }

export function loadSeniors() {
    return function (dispatch) {
        return seniorApi
            .getSeniors()
            .then(seniors => {
                dispatch(loadSeniorsSuccess(seniors));
            })
            .catch(error => {
                throw error;
            });
    }
}