import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/seniors/";

export function getSeniors() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}
