import { authHeader, generateHeaders, tokenExpired } from "../components/common/Helper";
import { handleResponse, handleError } from "./apiUtils";
import { refresh } from "./logApi";
const baseUrl = process.env.REACT_APP_API_URL + "/seniors/";

export function getSeniors() {
    return tokenExpired() ? _getSeniorsAfterRefresh() : _getSeniorsNow();
}

export function saveSenior(senior) {
    return tokenExpired() ? _saveSeniorAfterRefresh(senior) : _saveSeniorNow(senior);
}

export function deleteSenior(seniorId) {
    return tokenExpired() ? _deleteSeniorAfterRefresh(seniorId) : _deleteSeniorNow(seniorId);
}


function _getSeniorsAfterRefresh() {
    return refresh().then((param) => {
        return _getSeniorsNow();
    })
}

function _getSeniorsNow() {
    return fetch(baseUrl, { method: 'GET', headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}

function _saveSeniorAfterRefresh(senior) {
    return refresh().then((param) => {
        return _saveSeniorNow(senior);
    })
}

function _saveSeniorNow(senior) {
    debugger;
    delete senior.forms;
    if (!senior.id) {
        delete senior.id;
        senior.createdAt = new Date();
    }
    debugger;
    return fetch(baseUrl + (senior.id || ""), {
        method: senior.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: generateHeaders(),
        body: JSON.stringify(senior)
    })
        .then(handleResponse)
        .catch(handleError);
}

function _deleteSeniorAfterRefresh(seniorId) {
    return refresh().then((param) => {
        return _deleteSeniorNow(seniorId);
    })
}

function _deleteSeniorNow(seniorId) {
    return fetch(baseUrl + seniorId, { method: "DELETE", headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}
