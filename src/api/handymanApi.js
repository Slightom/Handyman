import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/handymans/";

export function getHandymans() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}
