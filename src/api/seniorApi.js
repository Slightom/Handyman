import { authHeader, generateHeaders } from "../components/common/Helper";
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/seniors/";

export function getSeniors() {
    return fetch(baseUrl, { method: 'GET', headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}

export function saveSenior(senior) {
    debugger;
    const s = JSON.stringify(senior);

    return fetch(baseUrl + (senior.id || ""), {
        method: senior.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: generateHeaders(),
        body: JSON.stringify(senior)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteSenior(seniorId) {
    return fetch(baseUrl + seniorId, { method: "DELETE", headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}
