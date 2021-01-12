import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as formActions from "../../redux/actions/formActions";
import * as seniorActions from "../../redux/actions/seniorActions";
import * as handymanActions from "../../redux/actions/handymanActions";
import * as formStatusActions from "../../redux/actions/formStatusActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import FormList from "./FormList";

function FormsPage({ seniors, handymans, formStatuses, actions, ...props }) {
    const [form, setForm] = useState({ info: "" });
    const [forms, setForms] = useState([]);

    useEffect(() => {
        if (props.forms.length === 0) {
            actions.loadForms().catch(error => {
                alert("Loading forms failed" + error);
            });
        }
        if (seniors.length === 0) {
            actions.loadSeniors().catch(error => {
                alert("Loading seniors failed" + error);
            });
        }
        if (handymans.length === 0) {
            actions.loadHandymans().catch(error => {
                alert("Loading handymans failed" + error);
            });
        }
        if (formStatuses.length === 0) {
            actions.loadFormStatuses().catch(error => {
                alert("Loading formStatuses failed" + error);
            });
        }

    }, [seniors, handymans, formStatuses, props.forms]);


    return (
        <>
            <h2>Forms</h2>
            <FormList forms={props.forms} />
        </>
    )
}

FormsPage.propTypes = {
    forms: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
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

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(formActions, dispatch)
        actions: {
            loadForms: bindActionCreators(formActions.loadForms, dispatch),
            loadSeniors: bindActionCreators(seniorActions.loadSeniors, dispatch),
            loadHandymans: bindActionCreators(handymanActions.loadHandymans, dispatch),
            loadFormStatuses: bindActionCreators(formStatusActions.loadFormStatuses, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormsPage);

// here is the same but divided into two lines.
// const connectedStateAndProps = connect(mapStateToprops, mapDispatchToProps);
// export default connectedStateAndProps(FormsPage);