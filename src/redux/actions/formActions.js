import * as types from "./actionTypes";

export function createForm(form) {
    return { type: types.CREATE_FORM, form };
}