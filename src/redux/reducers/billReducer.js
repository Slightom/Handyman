import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function billReducer(state = initialState.bills, action) {
    debugger;
    switch (action.type) {
        case types.LOAD_BILLS_SUCCESS:
            return action.bills;
        case types.CREATE_BILL_SUCCESS:
            return [...state, action.bill];
        case types.UPDATE_BILL_SUCCESS:
            return state.map(bill => bill.id === action.bill.id ? action.bill : bill);
        case types.DELETE_BILL_OPTIMISTIC:
            return state.filter(bill => bill.id !== action.bill.id);
        default:
            return state;
    }
}