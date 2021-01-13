import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as formActions from "../../redux/actions/formActions";
import * as seniorActions from "../../redux/actions/seniorActions";
import * as handymanActions from "../../redux/actions/handymanActions";
import * as formStatusActions from "../../redux/actions/formStatusActions";
import PropTypes from "prop-types";
import FormList from "./FormList";
import { newForm } from "../../tools/mockData";
import FormForm from "./FormForm";

function ManageFormsPage({
    seniors,
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
    const [forms, setForms] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.forms.length === 0) {
            loadForms().catch(error => {
                alert("Loading forms failed" + error);
            });
        } else {
            setForm({ ...props.form });
        }
        if (seniors.length === 0) {
            loadSeniors().catch(error => {
                alert("Loading seniors failed" + error);
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

    }, [props.form]);


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
            [name]: (name === "lp" || name === "seniorId" || name === "handymanId" || name === "formStatusId")
                ? parseInt(value, 10)
                : value
        }));
    }

    function handleSave(event) {
        event.preventDefault();
        saveForm(form).then(() => {
            // eslint-disable-next-line no-restricted-globals
            history.push("/forms");
        });
    }

    return (
        <>
            <FormForm
                form={form}
                seniors={seniors}
                handymans={handymans}
                formStatuses={formStatuses}
                errors={errors}
                onChange={handleChange}
                onSave={handleSave}
            />
        </>
    )
}

ManageFormsPage.propTypes = {
    forms: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
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
        forms: (state.seniors.length === 0 || state.handymans.length === 0 || state.formStatuses.length === 0)
            ? []
            : state.forms.map(form => {
                const _senior = state.seniors.find(s => s.id === form.seniorId);
                return {
                    ...form,
                    senior: _senior.firstName + ' ' + _senior.lastName,
                    address: _senior.address,
                    phone: _senior.phone,
                    handyman: state.handymans.find(h => h.id === form.handymanId).name,
                    status: state.formStatuses.find(fs => fs.id === form.formStatusId).name
                };
            }),
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


export default connect(mapStateToProps, mapDispatchToProps)(ManageFormsPage);

// here is the same but divided into two lines.
// const connectedStateAndProps = connect(mapStateToprops, mapDispatchToProps);
// export default connectedStateAndProps(ManageFormsPage);