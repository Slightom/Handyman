import * as types from "./actionTypes";
import * as billApi from "../../api/billApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadBillsSuccess(bills) {
    return { type: types.LOAD_BILLS_SUCCESS, bills };
}

export function createBillSuccess(bill) {
    return { type: types.CREATE_BILL_SUCCESS, bill };
}

export function updateBillSuccess(bill) {
    return { type: types.UPDATE_BILL_SUCCESS, bill };
}

export function deleteBillOptimistic(bill) {
    return { type: types.DELETE_BILL_OPTIMISTIC, bill };
}


export function saveBill(bill) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return billApi
            .saveBill(bill)
            .then(savedBill => {
                bill.id
                    ? dispatch(updateBillSuccess(savedBill))
                    : dispatch(createBillSuccess(savedBill))
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}

export function loadBills() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return billApi
            .getBills()
            .then(bills => {
                dispatch(loadBillsSuccess(bills));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    }
}

export function deleteBill(bill) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        dispatch(deleteBillOptimistic(bill));
        return billApi.deleteBill(bill.id);
    };
}