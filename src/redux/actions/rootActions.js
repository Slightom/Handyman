import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function logout() {
    return { type: types.USER_LOGOUT };
}
