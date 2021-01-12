import React, { useState } from "react";
import { connect } from "react-redux";
import * as formActions from "../../redux/actions/formActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

function FormsPage(props) {
    const [form, setForm] = useState({ info: "" });

    function handleChange(event) {
        const _form = { ...form, info: event.target.value };
        setForm(_form);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.actions.createForm(form);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Forms</h2>
            <h3>Add Form</h3>
            <input
                type="text"
                onChange={handleChange}
                value={form.info}
            />

            <input type="submit" value="Save" />
            {props.forms.map(form => (
                < div key={form.info} >{form.info}</div>
            ))}
        </form >
    )
}

FormsPage.propTypes = {
    forms: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        forms: state.forms
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(formActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormsPage);

// here is the same but divided into two lines.
// const connectedStateAndProps = connect(mapStateToprops, mapDispatchToProps);
// export default connectedStateAndProps(FormsPage);