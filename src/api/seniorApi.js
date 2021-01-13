import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/seniors/";

export function getSeniors() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}

export function saveSenior(senior) {
    return fetch(baseUrl + (senior.id || ""), {
        method: senior.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: { "content-type": "application/json" },
        body: JSON.stringify(senior)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteSenior(seniorId) {
    return fetch(baseUrl + seniorId, { method: "DELETE" })
        .then(handleResponse)
        .catch(handleError);
}
