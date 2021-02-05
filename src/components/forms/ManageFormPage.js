import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as formActions from "../../redux/actions/formActions";
import * as seniorActions from "../../redux/actions/seniorActions";
import * as handymanActions from "../../redux/actions/handymanActions";
import * as formStatusActions from "../../redux/actions/formStatusActions";
import PropTypes from "prop-types";
import { newForm, seniors } from "../../tools/mockData";
import FormForm from "./FormForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { isNumber, naviGateBack, stringIsPropertyInt, sortArray, toastError, getSeniorsWithRelatedForms } from "../common/Helper";
import { Labels } from '../common/myGlobal';
import { useHistory } from "react-router-dom";

function ManageFormPage({
    handymans,
    formStatuses,
    loadForms,
    loadSeniors,
    loadHandymans,
    loadFormStatuses,
    saveForm,
    history,
    loading,
    ...props
}) {
    const [form, setForm] = useState({ ...props.form });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [_seniors, _setSeniors] = useState([...props.seniors]);

    useEffect(() => {
        debugger;
        if (props.forms.length === 0) {
            loadForms().catch(error => {
                toastError(toast, Labels.LoadingFormsFailed + error, props.history);
            });
        } else {
            setForm({ ...props.form });
        }
        if (props.seniors.length === 0) {
            loadSeniors().catch(error => {
                toastError(toast, Labels.LoadingSeniorsFailed + error, props.history);
            });
        } else {
            _setSeniors(props.seniors);
        }
        if (handymans.length === 0) {
            loadHandymans().catch(error => {
                toastError(toast, Labels.LoadingHandymansFailed + error, props.history);
            });
        }
        if (formStatuses.length === 0) {
            loadFormStatuses().catch(error => {
                toastError(toast, Labels.LoadingFormStatusesFailed + error, props.history);
            });
        }

    }, [props.seniors.length, props.forms.length]);


    function handleChange(event, dateName) {
        let name, value;
        if (dateName !== undefined) {
            name = dateName;
            value = new Date(event);
        } else {
            name = event.target.name;
            value = event.target.value;
        }

        checkHowManyForms(name, value);

        setForm(prevForm => ({
            ...prevForm,
            [name]: (name === "seniorId" || name === "handymanId" || name === "formStatusId")
                ? parseInt(value, 10)
                : value
        }));

    }

    function made5forms(seniorId) {
        const s = _seniors.find(x => x.id === parseInt(seniorId, 10));
        return s.forms.length >= 5;
    }

    function checkHowManyForms(name, value) {
        if (name === "seniorId") {
            const errors = {}
            if (value !== "" && made5forms(value)) {
                errors.senior = Labels.ErrorSenior5FormsAlready;
            }
            setErrors(errors);
        }
    }
    function formIsValid() {
        const { lp, seniorId, handymanId, formStatusId, registrationDate, repairDate, info } = form;
        const errors = {};

        debugger;
        if (!lp) errors.lp = Labels.ErrorLpRequired;
        else if (!stringIsPropertyInt(lp)) errors.lp = Labels.ErrorLpMustBeNumber;
        else if (seniorId && alreadyExistFormWithThisLp(lp)) errors.lp = Labels.ErrorLpDuplicate;
        if (!seniorId) errors.senior = Labels.ErrorSeniorRequired;
        else if (made5forms(seniorId)) errors.senior = Labels.ErrorSenior5FormsAlready;
        if (!handymanId) errors.handyman = Labels.ErrorHandymanRequired;
        if (!formStatusId) errors.formStatus = Labels.ErrorFormStatusRequired;
        if (!registrationDate) errors.registrationDate = Labels.ErrorRegistDateRequired;
        if (!repairDate) errors.repairDate = Labels.ErrorRepairDateRequired;
        lessThan30days(repairDate, errors);
        if (registrationDate && repairDate) {
            if (registrationDate > repairDate) errors.repairDate = Labels.ErrorRepairBeforeRegistration;
        }
        if (!info) errors.info = Labels.ErrorInfoRequired;

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    function lessThan30days(repair, errors) {
        if (!errors.seniorId) { //jesli wiemy czyje formularze mamy sprawdzic
            debugger;
            const millisecondsPerDay = 24 * 60 * 60 * 1000;
            let daysBetween;
            let formsRelated = props.forms.filter(x => x.seniorId === form.seniorId);

            if (formsRelated.length > 0) {
                formsRelated = sortArray(formsRelated, 'repairDate', false);
                const editingFormIndex = editMode() ? formsRelated.findIndex(x => x.id === form.id) : formsRelated.length;
                const previousForm = editingFormIndex > 0 ? formsRelated[editingFormIndex - 1] : null;
                const nextForm = formsRelated.length + 1 > editingFormIndex ? formsRelated[editingFormIndex + 1] : null;
                debugger;
                if (previousForm) {
                    daysBetween = (new Date(repair) - new Date(previousForm.repairDate)) / millisecondsPerDay;
                    if (daysBetween <= 30) {
                        errors.repairDate = Labels.ErrorRepairLess30days;
                        return true;
                    }
                }

                if (nextForm) {
                    daysBetween = (new Date(nextForm.repairDate) - new Date(repair)) / millisecondsPerDay;
                    if (daysBetween <= 30) {
                        errors.repairDate = Labels.ErrorRepairLess30daysNext;
                        return true;
                    }
                }
            }
            return false;


        }
    }

    function alreadyExistFormWithThisLp(lp) {
        lp = parseInt(lp, 10)
        debugger;
        let forms = editMode()
            ? props.forms.find(x => x.lp === lp && x.id !== form.id)
            : props.forms.find(x => x.lp === lp);
        debugger;
        return forms;
    }

    function editMode() {
        return form.id ? true : false;
    }

    function handleSave(event) {
        debugger;
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        const parsedLp = isNumber(form.lp)
            ? form.lp
            : parseInt(form.lp, 10);

        saveForm({ ...form, lp: parsedLp }).then(() => {
            // eslint-disable-next-line no-restricted-globals
            toast.success(Labels.FormSaved);
            history.push('/forms');
        });
    }


    return loading
        ? <Spinner />
        : (
            <FormForm
                form={form}
                seniors={_seniors}
                handymans={handymans}
                formStatuses={formStatuses}
                errors={errors}
                onChange={handleChange}
                onSave={handleSave}
                saving={saving}
                goBack={event => naviGateBack(history, event, '/form')}
            />
        )
}

ManageFormPage.propTypes = {
    forms: PropTypes.array.isRequired,
    seniors: PropTypes.array.isRequired,
    handymans: PropTypes.array.isRequired,
    formStatuses: PropTypes.array.isRequired,
    loadForms: PropTypes.func.isRequired,
    loadSeniors: PropTypes.func.isRequired,
    loadHandymans: PropTypes.func.isRequired,
    loadFormStatuses: PropTypes.func.isRequired,
    saveForm: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export function getFormById(forms, id) {
    const findedForm = forms.find(f => f.id == id) || null;
    return findedForm;
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    let _form = id && state.forms.length > 0 ? getFormById(state.forms, id) : { ...newForm };
    debugger;
    const justAddedSenior = localStorage.getItem('justAddedSenior');
    if (justAddedSenior) {
        debugger;
        _form.seniorId = sortArray(state.seniors.filter(x => x.createdAt), 'createdAt', true)[0].id;
        localStorage.removeItem('justAddedSenior');
    }

    return {
        form: _form,
        forms: state.forms,
        seniors: (state.seniors.length === 0) ? [] : getSeniorsWithRelatedForms(state.seniors, state.forms),
        handymans: state.handymans,
        formStatuses: state.formStatuses,
        loading: state.apiCallsInProgress > 0
    };
}

const mapDispatchToProps = {
    loadForms: formActions.loadForms,
    loadSeniors: seniorActions.loadSeniors,
    loadHandymans: handymanActions.loadHandymans,
    loadFormStatuses: formStatusActions.loadFormStatuses,
    saveForm: formActions.saveForm
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageFormPage);

// here is the same but divided into two lines.
// const connectedStateAndProps = connect(mapStateToprops, mapDispatchToProps);
// export default connectedStateAndProps(ManageFormsPage);