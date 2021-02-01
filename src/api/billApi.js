import { authHeader, generateHeaders, tokenExpired } from "../components/common/Helper";
import { handleResponse, handleError } from "./apiUtils";
import { refresh } from './logApi';

const baseUrl = process.env.REACT_APP_API_URL + "/bills/";

export function getBills() {
    return tokenExpired() ? _getBillsAfterRefresh() : _getBillsNow();
}

export function saveBill(bill) {
    return tokenExpired() ? _saveBillAfterRefresh(bill) : _saveBillNow(bill);
}

export function deleteBill(billId) {
    return tokenExpired() ? _deleteBillAfterRefresh(billId) : _deleteBillNow(billId);
}



function _getBillsAfterRefresh() {
    return refresh().then((param) => {
        return _getBillsNow();
    })
}

function _getBillsNow() {
    return fetch(baseUrl, { method: 'GET', headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}

function _saveBillAfterRefresh(bill) {
    return refresh().then((param) => {
        return _saveBillNow(bill);
    })
}

function _saveBillNow(bill) {
    if (!bill.id) {
        delete bill.id;
        bill.createdAt = Date.now();
    }
    return fetch(baseUrl + (bill.id || ""), {
        method: bill.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: generateHeaders(),
        body: JSON.stringify(bill)
    })
        .then(handleResponse)
        .catch(handleError);
}

function _deleteBillAfterRefresh(billId) {
    return refresh().then((param) => {
        return _saveBillNow(billId);
    })
}

function _deleteBillNow(billId) {
    return fetch(baseUrl + billId, { method: "DELETE", headers: authHeader() })
        .then(handleResponse)
        .catch(handleError);
}
