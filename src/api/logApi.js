import { currentUser } from "../components/common/Helper";
import { handleResponse } from "./apiUtils";

const baseUrl = process.env.REACT_APP_API_URL + '/users';


export function login({ username, password }) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${baseUrl}/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            setUserAndTokenData(user);
            return null;
        })
        .catch(error => { return error.message; });
}

export function refresh() {
    const user = currentUser();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: user.token, refreshToken: user.refreshToken })
    };

    return fetch(`${baseUrl}/refresh`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            setUserAndTokenData(user);
            return null;
        })
        .catch(error => { return error.message; });
}


function setUserAndTokenData(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    const now = new Date();
    localStorage.setItem('dateTokenActive', now);
}