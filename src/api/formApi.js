import { authHeader } from "../components/common/Helper";
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/forms/";

export function getForms() {
    debugger;
    return fetch(baseUrl, { method: 'GET', headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}

export function saveForm(form) {
    return fetch(baseUrl + (form.id || ""), {
        method: form.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: authHeader(),
        body: JSON.stringify(form)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteForm(formId) {
    return fetch(baseUrl + formId, { method: "DELETE", headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}
