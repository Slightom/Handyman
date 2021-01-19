export function getFormsAdvanced(forms, seniors, handymans, formStatuses) {
    debugger;
    return forms.map(form => {
        const _senior = seniors.find(s => s.id === form.seniorId);
        const _handyman = handymans.find(h => h.id === form.handymanId);
        const formStatus = formStatuses.find(fs => fs.id === form.formStatusId);

        return {
            ...form,
            senior: _senior.firstName + ' ' + _senior.lastName,
            address: _senior.address,
            phone: _senior.phone,
            handyman: _handyman.name,
            status: formStatus.name
        };
    });
}

export function getRelatedFormsAdvanced(senior, forms, handymans, formStatuses) {

    const relatedForms = forms.filter(f => f.seniorId === senior.id);
    const rf = relatedForms.map(form => {
        const _handyman = handymans.find(h => h.id === form.handymanId);
        const _formStatus = formStatuses.find(fs => fs.id === form.formStatusId);

        return {
            ...form,
            senior: senior.firstName + ' ' + senior.lastName + ', ' + senior.address,
            handyman: _handyman.name,
            formStatus: _formStatus.name
        }
    });
    return rf;
}

export function generateDate(s) {
    const date = new Date(s);
    // return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
}

export function sortArray(arr, col, descending) {

    if (col.includes('handymans')) {
        const id = parseInt(col.charAt(col.length - 1));

        return descending
            ? arr.sort((a, b) => b['handymans'][id].forms - a['handymans'][id].forms)
            : arr.sort((a, b) => a['handymans'][id].forms - b['handymans'][id].forms);
    }

    let newArray;

    switch (col) {
        case 'lp':
        case 'forms':
        case 'formsFinished':
        case 'formsWaiting':
        case 'formsRejected':
        case 'amount':
            newArray = descending
                ? arr.sort((a, b) => b[col] - a[col])
                : arr.sort((a, b) => a[col] - b[col]);
            return newArray;
        case 'registrationDate':
        case 'repairDate':
        case 'date':
        case 'periodDate':
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

export function naviGateBack(history, event) {
    if (event) { event.preventDefault(); }

    history.goBack();
}

export function stringIsPropertyFloat(str) {

    let separatorAlready = false;
    let last = str.length - 1;
    debugger;

    if (Number(str) === str) return true;

    for (let i = 0; i <= last; i++) {
        const c = str.charCodeAt(i);
        if (c > 47 && c < 58)
            continue;
        else if (c === 44 || c === 46) {
            if (i === 0 || i === last) return false;
            if (separatorAlready)
                return false;
            else {
                separatorAlready = true; continue;
            }
        }
        return false;
    }

    return true;
}

export function stringIsPropertyInt(str) {
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