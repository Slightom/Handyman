import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.REACT_APP_API_URL + '/users';

export function login({ username, password }) {
    debugger;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${baseUrl}/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            debugger;
            return user;
        });
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}
