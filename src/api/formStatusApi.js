import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/formStatuses/";

export function getFormStatuses() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}
