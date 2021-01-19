import * as types from "./actionTypes";

export function _getSummaryRows() {
    return { type: types.GET_SUMMARY_ROWS };
}

export function _setSummaryRows(summaryRows) {
    return { type: types.SET_SUMMARY_ROWS, summaryRows };
}


export function getSummaryRows() {
    return function (dispatch) {
        return dispatch(_getSummaryRows());
    }
}

export function setSummaryRows(summaryRows) {
    return function (dispatch) {
        return dispatch(_setSummaryRows(summaryRows));
    }
}