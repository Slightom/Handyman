import { authHeader, tokenExpired } from "../components/common/Helper";
import { handleResponse, handleError } from "./apiUtils";
import { refresh } from "./logApi";
const baseUrl = process.env.REACT_APP_API_URL + "/handymans/";


export function getHandymans() {
    return tokenExpired() ? _getHandymansAfterRefresh() : _getHandymansNow();
}


function _getHandymansAfterRefresh() {
    return refresh().then((param) => {
        return _getHandymansNow();
    })
}

function _getHandymansNow() {
    return fetch(baseUrl, { method: 'GET', headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}