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
import { getRelatedFormsAdvanced, naviGateBack } from "../common/Helper";

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
    ...props
}) {
    const [senior, setSenior] = useState({ ...props.senior, seniorForms: props.senior.id ? props.senior.seniorForms : [] });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (props.forms.length === 0) {
            loadForms().catch(error => {
                alert("Loading forms failed" + error);
            });
        }
        if (handymans.length === 0) {
            loadHandymans().catch(error => {
                alert("Loading handymans failed" + error);
            });
        }
        if (formStatuses.length === 0) {
            loadFormStatuses().catch(error => {
                alert("Loading formStatuses failed" + error);
            });
        }
        if (seniors.length === 0) {
            loadSeniors().catch(error => {
                alert("Loading seniors failed" + error);
            });
        } else {
            setSenior({ ...props.senior, seniorForms: props.senior.seniorForms });
        }

    }, [props.senior]);


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

        if (!firstName) errors.firstName = "First name is required.";
        if (!lastName) errors.lastName = "Last name is required.";
        if (!address) errors.address = "Address is required.";
        if (!phone) errors.phone = "Phone is required.";

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveSenior(senior).then(() => {
            debugger;
            // eslint-disable-next-line no-restricted-globals
            toast.success("Senior Saved.");
            history.push("/seniors");
        });
    }

    function check() {
        return (props.forms.length === 0 || seniors.length === 0)
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
    const id = ownProps.match.params.id;
    const _senior = id && state.seniors.length > 0 ? getSeniorById(state.seniors, id) : newSenior;
    return {
        senior: (state.seniors.length === 0 || state.forms.length === 0 || state.handymans.length === 0 || state.formStatuses.length === 0)
            ? _senior
            : {
                ..._senior,
                seniorForms: getRelatedFormsAdvanced(_senior, state.forms, state.handymans, state.formStatuses)
            },
        forms: state.forms,
        seniors: state.seniors,
        handymans: state.handymans,
        formStatuses: state.formStatuses
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