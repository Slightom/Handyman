import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as formActions from "../../redux/actions/formActions";
import * as seniorActions from "../../redux/actions/seniorActions";
import * as handymanActions from "../../redux/actions/handymanActions";
import * as formStatusActions from "../../redux/actions/formStatusActions";
import PropTypes from "prop-types";
import { newForm } from "../../tools/mockData";
import FormForm from "./FormForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { isNumber, naviGateBack, stringIsPropertyInt } from "../common/Helper";

function ManageFormPage({
    handymans,
    formStatuses,
    loadForms,
    loadSeniors,
    loadHandymans,
    loadFormStatuses,
    saveForm,
    history,
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
                alert("Loading forms failed" + error);
            });
        } else {
            setForm({ ...props.form });
        }
        if (props.seniors.length === 0) {
            loadSeniors().catch(error => {
                alert("Loading seniors failed" + error);
            });
        } else {
            _setSeniors([...props.seniors]);
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

    }, [props.form, props.seniors.length]);


    function handleChange(event, dateName) {
        let name, value;
        if (dateName !== undefined) {
            name = dateName;
            value = new Date(event);
        } else {
            name = event.target.name;
            value = event.target.value;
        }

        setForm(prevForm => ({
            ...prevForm,
            [name]: (name === "seniorId" || name === "handymanId" || name === "formStatusId")
                ? parseInt(value, 10)
                : value
        }));
    }

    function formIsValid() {
        const { lp, seniorId, handymanId, formStatusId, registrationDate, repairDate, info } = form;
        const errors = {};

        if (!lp) errors.lp = "Lp is required.";
        else if (!stringIsPropertyInt(lp)) errors.lp = "Lp must be a number."
        if (!seniorId) errors.senior = "Senior is required.";
        if (!handymanId) errors.handyman = "Handyman is required.";
        if (!formStatusId) errors.formStatus = "Form Status is required.";
        if (!registrationDate) errors.registrationDate = "Registration date is required.";
        if (!repairDate) errors.repairDate = "Repair date is required.";
        if (!info) errors.info = "Info is required.";

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        const parsedLp = isNumber(form.lp)
            ? form.lp
            : parseInt(form.lp, 10);

        saveForm({ ...form, lp: parsedLp }).then(() => {
            // eslint-disable-next-line no-restricted-globals
            toast.success("Form Saved.");
            history.push("/forms");
        });
    }


    return (props.forms.length === 0 || props.seniors.length === 0 || handymans.length === 0 || formStatuses.length === 0)
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
                goBack={event => naviGateBack(history, event)}
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
    const _form = id && state.forms.length > 0 ? getFormById(state.forms, id) : newForm;
    return {
        form: _form,
        forms: state.forms,
        seniors: state.seniors,
        handymans: state.handymans,
        formStatuses: state.formStatuses
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