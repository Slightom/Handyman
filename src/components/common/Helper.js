import * as logApi from '../../api/logApi';
import { SESSION_TIME } from "./myGlobal";

export function getFormsAdvanced(forms, seniors, handymans, formStatuses) {
    debugger;
    let _forms = forms.map(form => {
        const _senior = seniors.find(s => s.id === form.seniorId);
        const _handyman = handymans.find(h => h.id === form.handymanId);
        const formStatus = formStatuses.find(fs => fs.id === form.formStatusId);

        return {
            ...form,
            senior: _senior.lastName + ' ' + _senior.firstName,
            address: _senior.address,
            phone: _senior.phone,
            handyman: _handyman.name,
            status: formStatus.name
        };
    });
    return _forms;
}

export function getRelatedFormsAdvanced(senior, forms, handymans, formStatuses) {

    debugger;
    let relatedForms = forms.filter(f => f.seniorId === senior.id);
    if (relatedForms.length === 0) {
        return [];
    }
    let rf = sortArray(relatedForms, 'repairDate', true);
    rf = relatedForms.map(form => {
        const _handyman = handymans.find(h => h.id === form.handymanId);
        const _formStatus = formStatuses.find(fs => fs.id === form.formStatusId);

        return {
            ...form,
            senior: senior.lastName + ', ' + senior.firstName + ', ' + senior.address,
            handyman: _handyman.name,
            formStatus: _formStatus.name
        }
    });

    return rf;
}

export function getSeniorsWithRelatedForms(seniors, forms) {
    debugger;
    const seniorsWithForms = seniors.map(senior => {
        return {
            ...senior,
            forms: forms.filter(x => x.seniorId === senior.id)
        }

    });
    return seniorsWithForms;
}

export function generateDate(s) {
    const date = new Date(s);
    // return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    return date.getDate() + '-' + date.toLocaleString('default', { month: 'short' }) + '-' + date.getFullYear();
    // return date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
}

export function sortArray(arr, col, descending) {
    if (arr.length === 0)
        return arr;
    if (col.includes('handymans')) { // for summary table 
        const id = parseInt(col.charAt(col.length - 1));

        return descending
            ? arr.sort((a, b) => b['handymans'][id].forms - a['handymans'][id].forms)
            : arr.sort((a, b) => a['handymans'][id].forms - b['handymans'][id].forms);
    }

    let newArray;
    debugger;
    switch (col) {
        case 'lp':
        case 'forms':
        case 'formsFinished':
        case 'formsWaiting':
        case 'formsRejected':
        case 'amount':
        case 'amountAvg':
        case 'billsAmount':
        case 'billsAmountAvg':
            newArray = descending
                ? arr.sort((a, b) => b[col] - a[col])
                : arr.sort((a, b) => a[col] - b[col]);
            return newArray;
        case 'registrationDate':
        case 'repairDate':
        case 'date':
        case 'periodDate':
        case 'createdAt':
            newArray = descending
                ? arr.sort((a, b) => new Date(b[col]) - new Date(a[col]))
                : arr.sort((a, b) => new Date(a[col]) - new Date(b[col]));
            return newArray;
        case 'senior':
        case 'address':
        case 'phone':
        case 'status':
        case 'handyman':
        case 'firstName':
        case 'lastName':
        case 'info':
        case 'name':
            newArray = arr.sort((a, b) => a[col].localeCompare(b[col]));
            return descending ? newArray.reverse() : newArray;
        default:
            return arr;
    }
}

export function naviGateBack(history, event, actualPath) {
    if (event) { event.preventDefault(); }

    if (history.location.state && history.location.state.from) {
        const backfrom = history.location.state.from;
        switch (backfrom) {
            case '/senior':
                if (actualPath === '/form')
                    history.push('/forms', { from: null });
                break;
            default:
        }
        return;
    }
    debugger;
    history.goBack();
}

export function stringIsPropertyFloat(str) {
    if (Number(str) === str) return true;
    return /^\d+([.,]?\d+)?$/g.test(str);
}

export function stringIsPropertyInt(str) {
    if (Number(str) === str) return true;

    for (const c of str) {
        if (c.charCodeAt() < 48 || c.charCodeAt() > 57)
            return false;
    }
    return true;
}

export function stringIsPropertyUInt(str) {
    if (str[0] === '-')
        str = str.substring(1);
    if (Number(str) === str) return true;

    for (const c of str) {
        if (c.charCodeAt() < 48 || c.charCodeAt() > 57)
            return false;
    }
    return true;
}

export function isNumber(value) {
    return typeof value === "number";
}

export function currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

export function authHeader() {
    // return authorization header with jwt token
    const _currentUser = currentUser();
    if (_currentUser && _currentUser.token) {
        return { Authorization: `Bearer ${_currentUser.token}` };
    } else {
        return {};
    }
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('dateTokenActive');
}

export function generateHeaders() {
    const auth = authHeader();

    return { "Authorization": auth.Authorization, "content-type": "application/json" };
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function tokenExpired() {
    const tokenDateStart = new Date(localStorage.getItem('dateTokenActive')).getTime();
    const now = (new Date()).getTime();

    return (now - tokenDateStart) / 1000 > SESSION_TIME;
}

export function toastError(toast, error, history) {
    toast.error(error);
    history.push('/logging');
}
