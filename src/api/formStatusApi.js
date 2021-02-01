import { authHeader, tokenExpired } from "../components/common/Helper";
import { handleResponse, handleError } from "./apiUtils";
import { refresh } from "./logApi";
const baseUrl = process.env.REACT_APP_API_URL + "/formStatuses/";

export function getFormStatuses() {
    return tokenExpired() ? _getFormStatusesAfterRefresh() : _getFormStatusesNow();
}


function _getFormStatusesAfterRefresh() {
    return refresh().then((param) => {
        return _getFormStatusesNow();
    })
}

function _getFormStatusesNow() {
    return fetch(baseUrl, { method: 'GET', headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}