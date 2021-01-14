export function getFormsAdvanced(forms, seniors, handymans, formStatuses) {

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
            senior: senior.shortcut,
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
    let newArray;
    switch (col) {
        case 'lp':
        case 'forms':
        case 'formsFinished':
        case 'formsWaiting':
        case 'formsRejected':
            newArray = descending ? arr.sort((a, b) => b[col] - a[col]) : arr.sort((a, b) => a[col] - b[col]);
            return newArray;
        case 'registrationDate':
        case 'repairDate':
            newArray = descending ? arr.sort((a, b) => new Date(b[col]) - new Date(a[col])) : arr.sort((a, b) => new Date(a[col]) - new Date(b[col]));
            return newArray;
        case 'senior':
        case 'address':
        case 'phone':
        case 'status':
        case 'handyman':
        case 'firstName':
        case 'lastName':
        case 'info':
            newArray = arr.sort((a, b) => a[col].localeCompare(b[col]));
            return descending ? newArray.reverse() : newArray;
        default:
            return arr;
    }
}