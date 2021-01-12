import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/forms/";

export function getForms() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}

export function saveForm(form) {
    return fetch(baseUrl + (form.id || ""), {
        method: form.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteForm(formId) {
    return fetch(baseUrl + formId, { method: "DELETE" })
        .then(handleResponse)
        .catch(handleError);
}
