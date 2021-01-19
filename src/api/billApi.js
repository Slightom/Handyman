import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/bills/";

export function getBills() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}

export function saveBill(bill) {
    return fetch(baseUrl + (bill.id || ""), {
        method: bill.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bill)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteBill(billId) {
    return fetch(baseUrl + billId, { method: "DELETE" })
        .then(handleResponse)
        .catch(handleError);
}
