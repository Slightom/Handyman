import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as formActions from "../../redux/actions/formActions";
import * as seniorActions from "../../redux/actions/seniorActions";
import * as handymanActions from "../../redux/actions/handymanActions";
import * as formStatusActions from "../../redux/actions/formStatusActions";
import PropTypes from "prop-types";
import { newSenior } from "../../tools/mockData";
import SeniorForm from "./SeniorForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { getRelatedFormsAdvanced, isNumber, naviGateBack, stringIsPropertyInt, stringIsPropertyUInt, toastError } from "../common/Helper";
import { Labels } from '../common/myGlobal';

function ManageSeniorPage({
    loadForms,
    loadSeniors,
    loadHandymans,
    loadFormStatuses,
    saveSenior,
    history,
    seniors,
    handymans,
    formStatuses,
    loading,
    ...props
}) {
    const [senior, setSenior] = useState({ ...props.senior, forms: props.senior.id ? props.senior.forms : [] });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (props.forms.length === 0) {
            loadForms().catch(error => {
                toastError(toast, Labels.LoadingFormsFailed + error, props.history);
            });
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
        if (seniors.length === 0) {
            loadSeniors().catch(error => {
                toastError(toast, Labels.LoadingSeniorsFailed + error, props.history);
            });
        } else {
            setSenior({ ...props.senior, forms: props.senior.forms });
        }

    }, [seniors.length]);


    function handleChange(event) {
        const { name, value } = event.target;
        setSenior(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    function formIsValid() {
        const { firstName, lastName, address, phone } = senior;
        const errors = {};

        if (!firstName) errors.firstName = Labels.ErrorFirstNameRequired;
        if (!lastName) errors.lastName = Labels.ErrorLastNameRequired;
        if (!address) errors.address = Labels.ErrorAddressRequired;
        if (!phone) errors.phone = Labels.ErrorPhoneRequired;

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveSenior(senior).then(() => {
            // eslint-disable-next-line no-restricted-globals
            toast.success(Labels.SeniorSaved);
            props.backToAddingForm
                ? handleBackToAddForm()
                : history.goBack()
                ;

        });
    }

    function handleBackToAddForm() {
        localStorage.setItem('justAddedSenior', "true");
        history.push("/form", { from: '/senior' });
    }

    function check() {
        return loading;
    }

    return check()
        ? <Spinner />
        : (
            <SeniorForm
                senior={senior}
                errors={errors}
                onChange={handleChange}
                onSave={handleSave}
                goBack={event => naviGateBack(history, event)}
                saving={saving}
            />
        )
}

ManageSeniorPage.propTypes = {
    forms: PropTypes.array.isRequired,
    seniors: PropTypes.array.isRequired,
    loadForms: PropTypes.func.isRequired,
    loadSeniors: PropTypes.func.isRequired,
    loadHandymans: PropTypes.func.isRequired,
    loadFormStatuses: PropTypes.func.isRequired,
    saveSenior: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export function getSeniorById(seniors, id) {
    const findedSenior = seniors.find(s => s.id == id) || null;
    return findedSenior;
}

function mapStateToProps(state, ownProps) {
    let param = ownProps.match.params.id;
    let id = undefined;
    if (param && stringIsPropertyUInt(param)) {
        id = param;
        param = undefined;
    }
    const _senior = id && state.seniors.length > 0 ? getSeniorById(state.seniors, id) : newSenior;
    return {
        senior: (state.seniors.length === 0 || state.handymans.length === 0 || state.formStatuses.length === 0)
            ? _senior
            : {
                ..._senior,
                forms: getRelatedFormsAdvanced(_senior, state.forms, state.handymans, state.formStatuses)
            },
        forms: state.forms,
        seniors: state.seniors,
        handymans: state.handymans,
        formStatuses: state.formStatuses,
        loading: state.apiCallsInProgress > 0,
        backToAddingForm: param
    };
}

const mapDispatchToProps = {
    loadForms: formActions.loadForms,
    loadSeniors: seniorActions.loadSeniors,
    saveSenior: seniorActions.saveSenior,
    loadHandymans: handymanActions.loadHandymans,
    loadFormStatuses: formStatusActions.loadFormStatuses
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageSeniorPage);