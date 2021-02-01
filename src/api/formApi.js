import { authHeader, generateHeaders, tokenExpired } from "../components/common/Helper";
import { handleResponse, handleError } from "./apiUtils";
import { refresh } from './logApi';
const baseUrl = process.env.REACT_APP_API_URL + "/forms/";

export function getForms() {
    debugger;
    return tokenExpired() ? _getFormsAfterRefresh() : _getFormsNow();
}

export function saveForm(form) {
    return tokenExpired() ? _saveFormAfterRefresh(form) : _saveFormNow(form);
}

export function deleteForm(formId) {
    return tokenExpired() ? _deleteFormAfterRefresh(formId) : _deleteFormNow(formId);
}


function _getFormsAfterRefresh() {
    return refresh().then((param) => {
        return _getFormsNow();
    })
}

function _getFormsNow() {
    return fetch(baseUrl, { method: 'GET', headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}

function _saveFormAfterRefresh(form) {
    return refresh().then((param) => {
        return _saveFormNow(form);
    })
}

function _saveFormNow(form) {
    if (!form.id) {
        delete form.id;
        form.createdAt = new Date();
    }
    return fetch(baseUrl + (form.id || ""), {
        method: form.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: generateHeaders(),
        body: JSON.stringify(form)
    })
        .then(handleResponse)
        .catch(handleError);
}

function _deleteFormAfterRefresh(formId) {
    return refresh().then((param) => {
        return _deleteFormNow(formId);
    })
}

function _deleteFormNow(formId) {
    return fetch(baseUrl + formId, { method: "DELETE", headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}