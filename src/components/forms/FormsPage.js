import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as formActions from "../../redux/actions/formActions";
import * as seniorActions from "../../redux/actions/seniorActions";
import * as handymanActions from "../../redux/actions/handymanActions";
import * as formStatusActions from "../../redux/actions/formStatusActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import FormList from "./FormList";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { getFormsAdvanced, sortArray } from "../common/Helper";

function FormsPage({ seniors, handymans, formStatuses, actions, loading, ...props }) {
    const [sort, setSort] = useState({ col: 'lp', descending: true });
    const [_forms, _setForms] = useState([]);

    useEffect(() => {
        if (props.forms.length === 0) {
            actions.loadForms().catch(error => {
                alert("Loading forms failed" + error);
            });
        } else {
            _setForms(props.forms);
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
    }, [props.forms.length, props.seniors]);


    async function confirmedDelete(_form) {
        toast.success("Form deleted.");
        try {
            await actions.deleteForm(_form);
        } catch (error) {
            toast.error("Delete failed. " + error.message, { autoClose: false })
        }
    }

    function handleDeleteForm(_form) {

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => confirmedDelete(_form)
                },
                {
                    label: 'No',
                    onClick: () => { return; }
                }
            ]
        });
    }

    function handleSort(event, col) {
        debugger;
        event.preventDefault();
        const descending = ((sort.col === col) ? !sort.descending : false);
        _setForms(sortArray(_forms, col, descending));
        setSort({ col, descending });
    }


    return (
        <>
            {loading
                ? <Spinner />
                :
                <>
                    <FormList
                        onDeleteClick={handleDeleteForm}
                        onHeaderClick={handleSort}
                        forms={_forms}
                    />
                </>

            }
        </>
    )
}

FormsPage.propTypes = {
    forms: PropTypes.array.isRequired,
    seniors: PropTypes.array.isRequired,
    handymans: PropTypes.array.isRequired,
    formStatuses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool
};

function mapStateToProps(state) {
    debugger;
    return {
        forms: (state.forms.length === 0 || state.seniors.length === 0 || state.handymans.length === 0 || state.formStatuses.length === 0)
            ? []
            : getFormsAdvanced(state.forms, state.seniors, state.handymans, state.formStatuses).sort((a, b) => b.lp - a.lp),
        seniors: state.seniors,
        handymans: state.handymans,
        formStatuses: state.formStatuses,
        loading: state.apiCallsInProgress > 0
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
            deleteForm: bindActionCreators(formActions.deleteForm, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormsPage);

// here is the same but divided into two lines.
// const connectedStateAndProps = connect(mapStateToprops, mapDispatchToProps);
// export default connectedStateAndProps(FormsPage);